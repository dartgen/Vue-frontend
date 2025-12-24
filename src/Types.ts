export interface LoginResponse {
  message: string
  token: string
  user: {
    id: number
    username: string
  }
}

export interface Task {
  Id: number
  Szoveg: string
  Kesz: boolean
}
