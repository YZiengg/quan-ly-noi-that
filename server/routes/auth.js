import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { registerAccount,loginUser } from '../controllers/authControllers.js'; // Đảm bảo đường dẫn đúng

const router = express.Router(); // Khởi tạo router

router.post(API_PATH.REG_ACC, registerAccount); // Sử dụng router.post
router.post(API_PATH.LOGIN,loginUser)

export default router; 
