import mongoose,{ Schema }  from "mongoose";
import { DB_SCHEMA } from "../configs/Constants.js";

const OTP_SChema = new Schema({
    otp:{
        type:Number , required:true
    },
    email:{
        type:String, required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '60s' // Tự động xóa tài liệu sau 60 giây
    }
})

const OTP = mongoose.model(DB_SCHEMA.OTP, OTP_SChema);

export default OTP;