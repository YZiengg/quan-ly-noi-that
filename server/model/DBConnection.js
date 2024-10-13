import Account from './AccountSchema.js'; 
import User from './UserSchema.js'; 
import Category from './CategorySchema.js';
import Product from './ProductSchema.js';
import Brand from './BrandSchema.js';
import ShoppingCart from './ShoppingCartSChema.js';
import Order from './OrderSchema.js';
import OTP from './OTPSchema.js';
const DB_Connection = {
     Account,
     User,
     Category,
     Product,
     Brand,
     ShoppingCart,
     Order,
     OTP
};

// Xuất DB_Connection
export default DB_Connection;
