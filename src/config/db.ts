import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const Mongo_Uri =
      "mongodb+srv://aslah:aslah999@cluster0.6cpe0.mongodb.net/productInventory?retryWrites=true&w=majority";
    await mongoose.connect(process.env.MONGO_URI || Mongo_Uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
