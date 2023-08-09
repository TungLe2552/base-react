import type { LoginParams, LoginResult, LogoutResult } from '@/interface/user/login'

import { request } from '../request'
import { sdk } from '../axios'
import { User } from '@/interface/user/user'

export const apiLogin = (data: LoginParams) =>
  sdk
    .post<LoginParams, LoginResult>(`login-${data.extend}`, { password: data.password, email: data.email })
    .then((res) => res.data)
export const apiGetMe = () => sdk.get<User>('me').then((res) => res.data)

export const apiLogout = () => sdk.post<any, LogoutResult>('logout').then((res) => res.data)

export const apiGetUserToken = (value: string) =>
  sdk.post<any, any>(`admin/users/${value}/get-access-token`).then((res) => res.data.token)
