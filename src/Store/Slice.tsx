import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
export interface CounterState {
  login: string
  panier:object[],
}

// Define the initial state using that type
const initialState: CounterState = {
  login: "",
  panier:[]
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   addlogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },

    addPanier:(state,action:PayloadAction<object>) =>{
      state.panier.push(action.payload)

    }
  }
})

export const { addlogin,addPanier } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.login

export default counterSlice.reducer