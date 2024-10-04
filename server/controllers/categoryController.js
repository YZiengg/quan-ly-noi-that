import { STATUS } from '../configs/Constants.js'; 
import DB_Connection from '../model/DBConnection.js'; 
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


const createCategory = async (req, res)=>{
    const {category_id , category_name,images}= req.body
    try {
        const newCategory = new DB_Connection.Category({
            category_id,
            category_name,
            images
        });
        await newCategory.save();

        res.status(STATUS.CREATED).json({mesage:'tạo danh mục sản phẩm thành công',newCategory});
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({mesage:error})
        console.log(error)
    }
}

const getCategory = async(req,res)=>{
    try {
        const categories = await DB_Connection.Category.find();
        res.status(STATUS.OK).json(categories);
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            mesage:error.name,
            mesage:error.message
        })

    }
}

const deleteCategory = async(req, res) =>{
    const{categoryId} = req.params
    try {
        await DB_Connection.Category.findByIdAndDelete(categoryId);
        res.status(STATUS.OK).json({message: 'xóa danh mục sản phẩm thành công'});
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            mesage:error.name,
            mesage:error.message
        })
    }
}

const findCategoryById = async(req, res,next)=>{
    const {category_id} = req.body
    try {
        const categoryInstance = await DB_Connection.Category.findOne({category_id:category_id});
        if(!categoryInstance){
            return res.status(STATUS.FORBIDDEN).json({message:"không tìm thấy danh mục sản phẩm"});
        }
        req.categoryInstance= categoryInstance 
        next();
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({
            mesage:error.name,
            mesage:error.message
        })
    }
}

export {createCategory, getCategory, deleteCategory, findCategoryById}