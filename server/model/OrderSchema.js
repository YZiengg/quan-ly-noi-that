import mongoose, { Schema } from 'mongoose';
import { DB_SCHEMA } from '../configs/Constants.js';
const ObjectId = mongoose.Types.ObjectId;

const OrderSchema = new Schema({
    user: { type: ObjectId, ref: DB_SCHEMA.USER, required: true }, 
    items: [
        {
            product: { type: ObjectId, ref: DB_SCHEMA.PRODUCT, required: true }, // Sản phẩm đã đặt
            quantity: { type: Number, required: true }, // Số lượng sản phẩm
            priceTotal: { type: Number, required: false } // Tổng giá của sản phẩm đó
        }
    ],
    totalBill: { type: Number, required: false }, // Tổng số tiền của đơn hàng
    status: { type: String, enum:{values:['pendding' , 'shipped', 'delevered']}, default: 'pending' }, // Trạng thái đơn hàng (pending, shipped, delivered)
    shippingAddress: { type: String, required: false }, // Địa chỉ giao hàng
    createdAt: { type: Date, default: Date.now }, // Ngày tạo đơn hàng
}, { timestamps: true });

const Order = mongoose.model(DB_SCHEMA.ORDER, OrderSchema);

export default Order;
