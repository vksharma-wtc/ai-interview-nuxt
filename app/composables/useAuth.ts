interface User {
  id: number
  first_name: string
  email: string
}

interface LoginResponse {
  message: string
  accessToken: string
  user: User
}

interface RegisterResponse {
  message: string
  user: User
}

export const useAuth = () => {
  const { request } = useApi()

  const user = useState<User | null>('auth-user', () => null)
  const token = useState<string | null>('auth-token', () => null)

  const register = async (
    first_name: string,
    email: string,
    password: string
  ) => {
    const response = await request<RegisterResponse>(
      '/auth/register',
      {
        method: 'POST',
        body: {
          first_name,
          email,
          password,
        },
      }
    )

    return response
  }

  const login = async (
    email: string,
    password: string
  ) => {
    const response = await request<LoginResponse>(
      '/auth/login',
      {
        method: 'POST',
        body: {
          email,
          password,
        },
      }
    )

    token.value = response.accessToken
    user.value = response.user

    

    localStorage.setItem(
      'accessToken',
      response.accessToken
    )

    localStorage.setItem(
      'user',
      JSON.stringify(response.user)
    )

    return response
  }

  const logout = () => {
    token.value = null
    user.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('first_name')


    navigateTo('/login')
  }

  return {
    user,
    token,
    register,
    login,
    logout,
  }
}