import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name từ Cloudinary
    api_key: process.env.CLOUDINARY_API_KEY, // API key từ Cloudinary
    api_secret: process.env.CLOUDINARY_API_SECRET // API secret từ Cloudinary
});

export default cloudinary