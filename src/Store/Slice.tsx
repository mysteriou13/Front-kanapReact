import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
export interface CounterState {
  login: boolean
  addpanier:boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  login: false,
  addpanier:false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   addlogin: (state) => {
      
    if(state.login == false){
          state.login = true;
      }else{
        state.login = false;
      }

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