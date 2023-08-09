import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMe, apiGetUserToken, apiLogin, apiLogout } from '@/api/auth/auth.api'
import { getToken, setAdminToken, setToken } from '@/api/auth/helper'

import { AuthState } from '@/interface/store/auth'
import { LoginParams } from '@/interface/user/login'

export const loginAction = createAsyncThunk('auth/login', async (data: LoginParams, { dispatch, rejectWithValue }) => {
  try {
    const response = await apiLogin(data)
    setToken(response.token)
    dispatch(getInfoAction())
    return response
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})
// export const viewAsUser = createAsyncThunk('admin/users', async (data: any, { dispatch }) => {
//   try {
//     const response = await apiGetUserToken(data)
//     setAdminToken(response)
//     dispatch(getInfoAction())
//     window.location.href = '/'
//     return response
//   } catch (error: any) {
//     return error.response.data
//   }
// })
export const logoutAction = createAsyncThunk('auth/logout', async () => {
  const response = await apiLogout()
  return response
})
export const getInfoAction = createAsyncThunk('auth/me', async () => {
  const response = await apiGetMe()
  return response
})
export const getInitData = createAsyncThunk('auth/init', async (_, { dispatch }) => {
  if (getToken()) dispatch(getInfoAction())
})

export const loginReduces = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(loginAction.pending, (state) => {
      state.loading = true
      state.errorMessage = ''
    })
    .addCase(loginAction.fulfilled, (state) => {
      state.loading = false
      state.logged = true
    })
    .addCase(loginAction.rejected, (state, action: any) => {
      state.loading = false
      state.logged = false
      if (action.error) state.errorMessage = action.payload.message
    })
}
export const getInfoReduces = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(getInfoAction.pending, (state) => {
      state.loadingInfo = true
    })
    .addCase(getInfoAction.fulfilled, (state, action) => {
      state.loadingInfo = false
      state.currentUser = action.payload
    })
    .addCase(getInfoAction.rejected, (state) => {
      state.loadingInfo = false
      state.logged = false
      state.currentUser = undefined
      setToken('')
    })
}
export const logoutReduces = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(logoutAction.rejected, (state) => {
      state.currentUser = undefined
      state.errorMessage = ''
      state.logged = false
      state.loading = false
      setToken('')
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.currentUser = undefined
      state.errorMessage = ''
      state.logged = false
      state.loading = false
      const oldToken = localStorage.getItem('old-t')
      if (oldToken) {
        setToken(oldToken)
        window.location.href = '/admin'
      } else {
        setToken('')
      }
    })
}
// export const viewAsUserReduces = (builder: ActionReducerMapBuilder<AuthState>) => {
//   builder
//     .addCase(loginAction.pending, (state) => {
//       state.loading = true
//       state.errorMessage = ''
//     })
//     .addCase(viewAsUser.fulfilled, (state) => {
//       state.loading = false
//       state.logged = true
//     })
// }
