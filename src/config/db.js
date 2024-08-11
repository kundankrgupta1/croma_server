import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDatabse = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`)
		console.log(`MongoDB connected successfully!!!, DBHOST: ${connectionInstance.connection.host}`)
	} catch (error) {
		console.log(`MongoDB connection failed!!!!, ${error}`)
	}
}
export default connectDatabse;
