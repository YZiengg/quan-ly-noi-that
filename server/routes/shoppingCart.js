import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { vertifyToken } from '../middlewares/authMiddleware.js';
import { findProductById } from '../controllers/productControllers.js';
import { addProductToShoppingCart, getShoppingCart } from '../controllers/shoppingCartController.js';

const router = express.Router();
router.get(API_PATH.GET_SHOPPINGCART,vertifyToken,getShoppingCart);
router.post(API_PATH.ADD_TO_SHOPPINGCART,vertifyToken,findProductById,addProductToShoppingCart);

export default router;