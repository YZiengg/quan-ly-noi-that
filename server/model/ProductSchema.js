import mongoose from "mongoose";
import { DB_SCHEMA } from "../configs/Constants.js";
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        unique:true
    },

    product_name:{
        type : String,
        required:true
    },
    description:{
        type: String,
        required:false
    },
    brand:{
        type : ObjectId,
        ref: DB_SCHEMA.BRAND,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    productType: { type: String, required: true }, 
    images: [
        {
            url: { type: String, required: true }, // URL của ảnh
        }
    ],
    
    
},{ timestamps: true });

const Product = mongoose.model(DB_SCHEMA.PRODUCT, ProductSchema);

export default Product