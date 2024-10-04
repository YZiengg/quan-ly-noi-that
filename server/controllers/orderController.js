import { STATUS } from '../configs/Constants.js'; 
import DB_Connection from '../model/DBConnection.js'; 
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const createOrder = async (req, res) => {
    const { selectedItems, shippingAddress } = req.body; // selectedItems là mảng chứa các product IDs
    try {
        const user = req.user; 
        let totalBill = 0; // Khởi tạo tổng tiền

        // Tìm giỏ hàng của người dùng
        const cart = await DB_Connection.ShoppingCart.findOne({ user: new ObjectId(user.id) }).populate('items.product');
        
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        const orderItems = [];

        // Duyệt qua các sản phẩm đã chọn
        for (const selectedItem of selectedItems) {
            const item = cart.items.find(cartItem => cartItem.product._id.toString() === selectedItem.product);
            if (item) {
                // Thêm sản phẩm vào danh sách đơn hàng
                orderItems.push({
                    product: item.product._id, // Lấy ID sản phẩm
                    quantity: item.quantity,   // Lấy số lượng từ giỏ hàng
                    priceTotal: item.priceTotal // Tính tổng giá của sản phẩm trong giỏ hàng
                });
                // Tính tổng tiền cho đơn hàng
                totalBill += item.priceTotal;
            }
        }

        // Tạo đơn hàng
        const newOrder = new DB_Connection.Order({
            user: new ObjectId(user.id),
            items: orderItems, // Mảng sản phẩm đã chọn
            totalBill: totalBill,
            shippingAddress: shippingAddress,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newOrder.save();

        // Xóa các sản phẩm đã đặt khỏi giỏ hàng dựa trên product ID
        await DB_Connection.ShoppingCart.updateOne(
            { user: new ObjectId(user.id) },
            { 
                $pull: { 
                    items: { 
                        product: { $in: selectedItems.map(item => new ObjectId(item.product)) }
                    } 
                }
            }
        );

        res.status(STATUS.CREATED).json({ message: 'Đơn hàng đã được tạo thành công và sản phẩm đã được xóa khỏi giỏ hàng', order: newOrder });

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message,
        });
    }
};

const getOrders = async(req,res)=>{
    const {status} = req.params
    try {
        const user =req.user
        const orders = await DB_Connection.Order.find({
            user:new ObjectId(user.id),
            status:status
        }).populate({
            path:'items',
            populate:{
                path:'product'
            }
        })
        res.status(STATUS.OK).json(orders);
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message,
        });
    }
}

const updateStatusOrder = async(req,res)=>{
    const {orderId,status} = req.body
    try {
        // Cập nhật trạng thái của đơn hàng
        const updatedOrder = await DB_Connection.Order.findByIdAndUpdate(
            orderId, // ID của đơn hàng
            { status: status }, // Trạng thái mới
            { new: true } // Tùy chọn để trả về đơn hàng đã được cập nhật
        );

        res.status(STATUS.OK).json({message: 'Cập nhật trạng thái thành công!!!',updatedOrder})
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message,
        });
    }
}

const removeOrder = async(req,res)=>{
    const {orderId}= req.params
    try {
        const user = req.user
        const order = await DB_Connection.Order.findById({
            user: new ObjectId(user.id),
            _id: orderId
        });

        if(order && order.status === 'pending'){
            await DB_Connection.Order.deleteOne({_id:orderId});
            res.status(STATUS.OK).json({message: 'hủy đơn hàng thành công!!!'})
        }else{
            res.status(STATUS.BAD_REQUEST).json({message: 'đơn hàng đã được giao cho ĐVVT'})
        }
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message,
        });
    }
}
export { createOrder ,getOrders , updateStatusOrder, removeOrder};
