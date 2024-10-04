import express from 'express';
import { API_PATH } from '../configs/Constants.js';
import { vertifyToken } from '../middlewares/authMiddleware.js';
import { createOrder, getOrders, removeOrder, updateStatusOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get(API_PATH.GET_ORDERS,vertifyToken, getOrders)
router.post(API_PATH.CREATE_ORDER,vertifyToken,createOrder);
router.post(API_PATH.UPDATE_STATUS_ORDER,vertifyToken, updateStatusOrder);
router.delete(API_PATH.REMOVE_ORDER,vertifyToken, removeOrder);
export default router