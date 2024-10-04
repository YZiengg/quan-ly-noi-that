import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from '../configs/cloudinaryConfig.js';
// Cấu hình storage cho multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nodejs-ShopZone', // Thư mục trên Cloudinary để lưu ảnh
    allowedFormats: ['jpeg', 'png', 'jpg'], // Các định dạng file cho phép
  },
});

const upload = multer({ storage });

export default upload;