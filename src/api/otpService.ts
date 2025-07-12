import axios from 'axios'

const API_URL = 'http://localhost:3000'

export async function sendOtp(dest: string, type: 'email' | 'phone') {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  await axios.post(`${API_URL}/otps`, {
    dest, type, otp, timestamp: Date.now()
  })
  return otp
}

export async function verifyOtp(dest: string, type: 'email' | 'phone', otp: string) {
  const res = await axios.get(`${API_URL}/otps`, {
    params: { dest, type, otp }
  })
  return res.data.length > 0
}
