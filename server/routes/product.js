import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { createProduct, deleteProduct, getProduct, getProductByCategory, getProductDetail } from '../controllers/productControllers.js';
import { findCategoryById } from '../controllers/categoryController.js';

const router = express.Router(); // Khởi tạo router


router.get(API_PATH.GET_PROD, getProduct);
router.get(API_PATH.GET_PROD_CAT_ID, getProductByCategory);
router.get(API_PATH.GET_PROD_DETAIL, getProductDetail)
router.post(API_PATH.CREATE_PROD,findCategoryById,createProduct);
router.delete(API_PATH.DELETE_PROD,deleteProduct);


export default router