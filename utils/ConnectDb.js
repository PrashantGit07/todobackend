import mongoose from 'mongoose';

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log("DB connected successfully");
    }
    catch (err) {
        console.log("Error in DB connection", err);
    }
}

export default ConnectDb;

