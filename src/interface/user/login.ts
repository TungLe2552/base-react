export type Role = 'guest' | 'admin'

export interface LoginParams {
  email: string
  password: string
  extend?: string
}

export interface LoginResult {
  token: string
}

export interface LogoutResult {
  messsage: string
}
