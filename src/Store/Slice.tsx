import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
export interface CounterState {
  login: string
  addpanier:boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  login: "",
  addpanier:false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   addlogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },
   
    boladdpanier(state ){

      if(state.addpanier == false){
          state.addpanier = true;
      }else{
        state.addpanier = false;
      }

    }
  
  }
})

export const { addlogin ,boladdpanier} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.login

export default counterSlice.reducer