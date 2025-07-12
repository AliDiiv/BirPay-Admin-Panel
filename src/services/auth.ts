// Define the expected shape of the login response
interface LoginResponse {
  token: string;
}

// Mock login function that simulates an async API call
export const loginUser = async (
  email: string,
  password: string
) => {
  return new Promise<LoginResponse>((resolve, reject) => {
    // Simulate network delay of 1 second
    setTimeout(() => {
      // Check if the provided credentials match the test values
      if (email === 'test@test.com' && password === 'admin') {
        // Resolve the promise with a mock token
        resolve({ token: 'token' });
      } else {
        // Reject the promise with an error if login fails
        reject(new Error('Login failed'));
      }
    }, 1000);
  });
}
