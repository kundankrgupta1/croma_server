import mongoose from "mongoose";

const userModel = mongoose.Schema(
	{
		first_name: {
			type: String,
			trim: true,
		},
		middle_name: {
			type: String,
			trim: true
		},
		last_name: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			unique: true
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"]
		},
		date_of_birth: {
			type: Date,
		},
		otp: {
			type: Number
		},
		otp_expiry: {
			type: Date
		}
	}
)

const User = mongoose.model("User", userModel)

export default User;