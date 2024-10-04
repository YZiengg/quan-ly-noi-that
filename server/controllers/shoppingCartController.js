import { STATUS } from '../configs/Constants.js'; 
import DB_Connection from '../model/DBConnection.js'; 
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


const addProductToShoppingCart = async (req, res) => {
    const { quantity } = req.body;
    try {
        const user = req.user;
        const productInstance = req.productInstance;
        const priceTotal = productInstance.price * quantity;

        const cart = await DB_Connection.ShoppingCart.findOne({ user: new ObjectId(user.id) });

        if (cart) {
            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productInstance._id.toString());

            if (itemIndex > -1) {
                // Nếu sản phẩm đã có, cập nhật số lượng và giá tổng
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].priceTotal += priceTotal; 
            } else {
                // Nếu sản phẩm chưa có, thêm mới
                cart.items.push({
                    product: new ObjectId(productInstance._id),
                    quantity,
                    priceTotal
                });
            }
            
            await cart.save();
            res.status(STATUS.OK).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart });
        } else {
            // Nếu không có giỏ hàng, tạo mới
            const newCart = new DB_Connection.ShoppingCart({
                user: new ObjectId(user.id),
                items: [{
                    product: new ObjectId(productInstance._id),
                    quantity,
                    priceTotal
                }]
            });
            await newCart.save();
            res.status(STATUS.CREATED).json({ message: 'Giỏ hàng đã được tạo và sản phẩm đã được thêm vào', newCart });
        }
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message
        });
    }
};

const getShoppingCart = async(req,res)=>{
    try {
        const user = req.user
        const cart = await DB_Connection.ShoppingCart.find({user:new ObjectId(user.id)}).populate({
            path:'items',
            populate:{
                path:'product'
            }
        });
        if(!cart){
            return res.status(STATUS.FORBIDDEN).json({message:'không tìm thấy giỏ hàng '})      
        }
        res.status(STATUS.OK).json(cart);
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message
        });
    }
}

const removeItemCart = async (req, res) => {
    try {
        const user = req.user;
        const { itemId } = req.params;
        const cart = await DB_Connection.ShoppingCart.findOneAndUpdate(
            { user: new ObjectId(user.id) },
            { $pull: { items: { _id: new ObjectId(itemId) } } }, // Xóa item theo ID
            { new: true } // Trả về giỏ hàng mới sau khi xóa
        );

        if (cart) {
            res.status(STATUS.OK).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart });
        } else {
            res.status(STATUS.NOT_FOUND).json({ message: 'Không tìm thấy giỏ hàng hoặc sản phẩm' });
        }
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            message: error.name,
            error: error.message
        });
    }
};

export{addProductToShoppingCart, removeItemCart,getShoppingCart}