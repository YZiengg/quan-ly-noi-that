import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { uploadImages } from '../controllers/upload.js';
import upload from '../middlewares/upload.js';
const router = express.Router(); // Khởi tạo router

router.post(API_PATH.UPLOAD_IMAGE,upload.array("images", 10), uploadImages)

export default router