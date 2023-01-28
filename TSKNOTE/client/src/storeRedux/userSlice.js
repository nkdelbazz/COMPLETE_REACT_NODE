import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem('todo_app_token')
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        updateState : (state,action) => {
          state.token = action.payload
        },
        removeState : (state) => {
            state.token = ''
          }
    }
})

export const {updateState,removeState} = userSlice.actions 
export default userSlice.reducer