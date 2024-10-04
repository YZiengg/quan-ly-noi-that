import axios from 'axios';
import { createCategorySuccess, getCategoriesSuccess } from '../redux/slice/category';

export const createCategory = async(dispacth, data)=>{
    try {
        await axios.post(`/cat/create`,data)
        dispacth(createCategorySuccess());
        return { success: true }; // Thêm dòng này để trả về kết quả thành công
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message }; // Trả về thông tin lỗi nếu có
    }
}

export const getCategories =async(dispacth)=>{
    try {
        const res = await axios.get(`/cat/get`)

        dispacth(getCategoriesSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}