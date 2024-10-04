import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL), 
        
        console.log(`Connected to ${mongoose.connection.name} successfully!!!`);
    } catch (error) {
        console.log('Connection failed!!!', error);
    }
};

export default { connect };
