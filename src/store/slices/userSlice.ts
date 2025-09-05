import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userInfo: any
  token: string | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  userInfo: null,
  token: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setUserInfo, setToken, logout } = userSlice.actions
export default userSlice.reducer