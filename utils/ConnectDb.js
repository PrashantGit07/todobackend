import mongoose from 'mongoose';

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {

        });
        console.log("DB connected successfully");
    }
    catch (err) {
        console.log("Error in DB connection", err);
    }
}

export default ConnectDb;

