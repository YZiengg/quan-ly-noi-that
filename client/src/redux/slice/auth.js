import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:'auth',
    initialState:{
        account:null,
        otp:null,
        isfetching:false,
        error: false,
        sucsess:false
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.account= action.payload
            state.sucsess= true
        },
        registerSuccess:(state)=>{
            state.sucsess=true
        },
        sentOtpSuccess:(state,actions)=>{
            state.sucsess=true
            state.otp=actions.payload
        },
        logoutUser:(state)=>{
            state.account = null
            state.sucsess = false
        }
    }
});

export const{
    loginSuccess,
    registerSuccess,
    sentOtpSuccess,
    logoutUser
}= authSlice.actions


export default authSlice.reducer