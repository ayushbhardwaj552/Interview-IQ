import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log(`Error in connecting to the DB ${err}`);
        process.exit(1); // stop server if DB fails
    }
};

export default connectDb;