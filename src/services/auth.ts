
interface LoginResponse {
    token: string;
}
export const loginUser = async (
    email: string,
    password: string) => {
        return new Promise<LoginResponse>((resolve, reject) => {
            setTimeout(() => {
                if(email === 'test@test.com' && password === 'admin'){
                resolve({ token: 'token' })
            } else {
                reject(new Error('Login failed'))
            }
            }, 1000)
        })
}


