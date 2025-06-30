import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
export interface CounterState {
  login: string

}

// Define the initial state using that type
const initialState: CounterState = {
  login: "",

}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   addlogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },

  
  }
})

export const { addlogin } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.login

export default counterSlice.reducer