import cloudinary from "../configs/cloudinaryConfig.js"
import { STATUS } from "../configs/Constants.js"

const uploadImages = async (req,res)=>{
    try {
        const images = req.files.map(file => file.path)

        const uploadedImages = []
        for(let image of images){
            const results = await cloudinary.uploader.upload(image);
            console.log(results)
            uploadedImages.push({
                url:results.secure_url,
                publicId: results.public_id
            })
        }
        return res.status(STATUS.OK).json({message:"upload image thành công !!!",uploadedImages});

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({message: error})
    }
}

export{uploadImages}