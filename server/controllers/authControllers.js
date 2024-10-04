import { STATUS } from '../configs/Constants.js'; 
import DB_Connection from '../model/DBConnection.js'; 
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const ObjectId = mongoose.Types.ObjectId;

const registerAccount = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt)
        const newUser = new DB_Connection.User({
            user_name: req.body.user_name,
            role: req.body.role,
            id: req.body.id,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
        });
        await newUser.save();
        const newAccount = new DB_Connection.Account({
            user: new ObjectId(newUser._id),
            email: req.body.email,
            password:hashed
        });
        await newAccount.save();

        res.status(STATUS.CREATED).json({message: 'Tạo tài khoản thành công', newAccount});
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json(error);
    }
};

// create token
const generateAccessToken =  async (user)=>{
   return jwt.sign({
    id: user._id,
    role:user.role
   },
   process.env.JWT_ACCESS_KEY,
   {expiresIn: "1h"})
}

const generateRefressToken =  async (user)=>{
    return jwt.sign({
     id: user._id,
     role:user.role
    },
    process.env.JWT_REFRESS_KEY,
    {expiresIn: "1h"})
}

const loginUser = async (req,res)=>{
    const {email, password} = req.body
    try {
        const account = await DB_Connection.Account.findOne({email:email});
        if(!account){
            return res.status(STATUS.NOT_FOUND).json({message: 'Không tìm thấy email'});
        }
        const validPassword = await bcrypt.compare(
            password,
            account.password
        )
        if(!validPassword){
            return res.status(STATUS.NOT_FOUND).json({message: 'Mật khẩu không đúng'});
        }
        if(account && validPassword){
            const accessToken= await generateAccessToken(account.user);

            const {password,...orther}= account._doc;
            const user = account.user._doc;
            res.status(200).json({...orther,user,accessToken});            
        }
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({message: error});

    }
}

// Xuất hàm registerAccount
export { registerAccount , generateAccessToken , generateRefressToken, loginUser};
