// model/UserSchema.js
import mongoose, { Schema } from 'mongoose';
import { DB_SCHEMA } from '../configs/Constants.js';

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['staff', 'admin', 'customer'],
            message: 'Role {VALUE} is not supported'
        },
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender {VALUE} is not supported'
        },
        required: true,
    },
    phonenumber: {
        type: String,
        required: false,
        default: "chưa có số điện thoại"
    },
});

// Xuất mô hình User
const User = mongoose.model(DB_SCHEMA.USER, UserSchema);
export default User;
