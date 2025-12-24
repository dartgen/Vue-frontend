export interface LoginResponse {
  message: string
  user: {
    id: number
    username: string
  }
}
