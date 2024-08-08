import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface SessionState {
  isLoggedIn: boolean
}

const initialState: SessionState = {
  isLoggedIn: false,
}

export const SessionSlice = createSlice({
  name: 'Session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setIsLoggedIn } = SessionSlice.actions;

export const isLogedIn = (state: RootState) => state.session.isLoggedIn

export default SessionSlice.reducer;