import { RootState } from '@/stores'

export * from './action'

export const authUser = (state: RootState) => state.auth.currentUser
export const authLoading = (state: RootState) => state.auth.loading
export const authErrorMessage = (state: RootState) => state.auth.errorMessage
