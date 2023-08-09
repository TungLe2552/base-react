import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/store.ts'
import globalReducer from './global.store.ts'


const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
})
const store = configureStore({
  reducer: rootReducer
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;
