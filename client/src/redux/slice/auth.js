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
        }
    }
});

export const{
    loginSuccess,
    registerSuccess,
    sentOtpSuccess
}= authSlice.actions


export default authSlice.reducer