import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from '../constants.js';

dotenv.config();

const connectDB = async () => {
    try {
        const connectionString = `${process.env.LOCAL}/${DB_NAME}`;
        console.log("Connecting to:", connectionString);

        const connectionInstance = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected:', connectionInstance.connection.host);
    } catch (error) {
        console.error('Error occurred while connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectDB;
