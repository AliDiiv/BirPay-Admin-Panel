import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../types/store'
import { fetchUser, updateUser } from '../../types/userSlice'
import { useEffect } from 'react'

const dispatch = useDispatch<AppDispatch>()
const user = useSelector((state: RootState) => state.user.profile)

useEffect(() => {
  dispatch(fetchUser())
}, [])

const onSave = () => {
  dispatch(updateUser({
    id: user!.id,
    email: user.email,
    name: user.name,
    mobile: user.mobile
  }))
}
