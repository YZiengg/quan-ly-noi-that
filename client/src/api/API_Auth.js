import axios from "axios"
import { loginSuccess, registerSuccess, sentOtpSuccess } from "../redux/slice/auth";


export const loginUser = async(dispatch,navigate,loginData)=>{
    try {
        const res = await axios.post(`/auth/login`,loginData);
        dispatch(loginSuccess(res.data));
        navigate(`/`)
        return {success:true}
    } catch (error) {
        return { success: false, error: error.message };   
    }
}

export const sentOTP = async(dispatch,email)=>{
    try {
        const res = await axios.post(`/otp/sent-otp`, {email:email});
        dispatch(sentOtpSuccess(res.data));
        return{success:true}
    } catch (error) {
        return { success: false, error: error.message };    
    }
}

export const registerAccount = async(dispatch,navigate,regData)=>{
    try {
        const res = await axios.post(`/auth/reg`,regData);
        dispatch(registerSuccess(res.data));
        navigate('/login');
        return{success:true}
    } catch (error) {
        return {success:false , error:error.message}
    }
}