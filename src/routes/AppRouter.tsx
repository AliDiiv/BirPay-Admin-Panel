import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/LoginPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import Gateway from '../pages/Gateway/Gateway'
import ProtectedRoute from './ProtectedRoute'
import Settings from '../pages/Settings/Settings'
import UserLayout from '../layouts/UserLayout'
import Support from '../pages/Support/Support'

// User tab pages
import Security from '../pages/Settings/security'
import Notification from '../pages/Settings/notification'
import Devices from '../pages/Settings/devices'
import Merchant from '../pages/Settings/merchant'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gateway" element={<Gateway />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />

          {/* Common layout for user tabs*/}
          <Route path="/settings/account" element={<UserLayout />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/notification" element={<Notification />} />
          <Route path="/settings/devices" element={<Devices />} />
          <Route path="/settings/merchant" element={<Merchant />} />

        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
