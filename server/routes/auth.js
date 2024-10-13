import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { registerAccount,loginUser, sentOTP, checkOTP } from '../controllers/authControllers.js'; 

const router = express.Router(); 

router.post(API_PATH.SENT_OTP,sentOTP)
// router.post(API_PATH.CHECK_OTP, checkOTP)
router.post(API_PATH.REG_ACC,checkOTP,registerAccount); 
router.post(API_PATH.LOGIN,loginUser)

export default router; 
