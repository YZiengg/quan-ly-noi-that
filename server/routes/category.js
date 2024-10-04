import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { createCategory, deleteCategory, getCategory } from '../controllers/categoryController.js';
const router = express.Router(); // Khởi tạo router

router.get(API_PATH.GET_CAT,getCategory);
router.post(API_PATH.CREATE_CAT,createCategory);
router.delete(API_PATH.DELETE_CAT,deleteCategory);

export default router