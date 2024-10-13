import { STATUS } from '../configs/Constants.js'; 
import DB_Connection from '../model/DBConnection.js'; 
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const createProduct = async (req, res) => {
    const {
        product_id, product_name, productType, description, brand,
        price, quantity,images
    } = req.body;

    try {
        const categoryInstance = req.categoryInstance
        if (!product_id || !product_name || !productType || !brand || !price || !quantity ) {
            return res.status(STATUS.BAD_REQUEST).json({ message: 'Vui lòng cung cấp đầy đủ thông tin!' });
        }

        const newProduct = new DB_Connection.Product({
            product_id,
            product_name,
            productType,
            description,
            brand,
            price,
            quantity,
            images
        });
        
        await newProduct.save();
        if (categoryInstance) {
            categoryInstance.products.push(newProduct._id); // Thêm sản phẩm vào danh mục
            await categoryInstance.save(); // Lưu danh mục đã được cập nhật
        }
        res.status(STATUS.CREATED).json({
            message: 'Tạo sản phẩm thành công',
            newProduct
        });
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
}

const getProduct = async(req,res)=>{
    try {
        const products = await DB_Connection.Product.find();
        res.status(STATUS.OK).json(products);
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ 
            message: error.name,
            error: error.message 
        });

    }
}

const getProductByCategory = async(req,res) =>{
    const {categoryId} = req.params;
    try {
        const products = await DB_Connection.Category.findOne({category_id:categoryId}).populate('products');
        res.status(STATUS.OK).json(products);
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ 
            message: error.name,
            error: error.message 
        });
    }
}

const getProductDetail = async (req,res) =>{
    const {productId} = req.params;
    try {
        const product = await DB_Connection.Product.findOne({product_id:productId});
        if (!product) {
            return res.status(STATUS.NOT_FOUND).json({ message: "Product not found" });
        }
        res.status(STATUS.OK).json(product);
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ 
            message: error.name,
            error: error.message 
        });
    }
}

const deleteProduct = async(req,res) =>{
    const {productId, categoryId} = req.params
    try {
        const categoryUpdate =  await DB_Connection.Category.findByIdAndUpdate(categoryId,
            {$pull:{products: new ObjectId(productId)}}
        );
        await DB_Connection.Product.findByIdAndDelete(productId);
        await categoryUpdate.save();
        res.status(STATUS.OK).json({message:' Xóa sản phẩm thành công!!!'});
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ 
            message: error.name,
            error: error.message 
        });
    }
}

const findProductById = async(req,res,next)=> {
    const {product_id} = req.body
    try {
        const productInstance = await DB_Connection.Product.findOne({product_id: product_id});
        if(!productInstance){
            return res.status(STATUS.FORBIDDEN).json({message:'không tìm thấy sản phẩm'});
        } 

        req.productInstance = productInstance
        next();
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ 
            message: error.name,
            error: error.message 
        });
    }

}
export{createProduct, getProduct, deleteProduct, findProductById , getProductByCategory, getProductDetail}