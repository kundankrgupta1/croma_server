import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { generateOTP } from "../Util/generateOTP.js";
import { transporter } from "../Util/mailer.js";
dotenv.config();

export const userLoginAndRegister = async (req, res) => {
	const { email } = req.body;
	try {
		if (!email) {
			return res.status(400).json(
				{
					message: "Please enter the valid email!!!!",
					success: false
				}
			)
		}

		const otp = generateOTP();
		const otp_expiry = Date.now() + 10 * 60 * 1000;

		const user = await User.findOne({ email })

		if (user) {
			user.otp = otp;
			user.otp_expiry = otp_expiry;
			await user.save();

			await transporter.sendMail(
				{
					to: user.email,
					subject: "OTP for Login",
					text: `Your OTP is ${otp}. it is valid for 10 minutes`
				}
			)
			return res.status(200).json(
				{
					message: "OTP sent successfully!!!!",
					success: true
				}
			)
		} else {
			const newUser = new User(
				{
					email,
					otp,
					otp_expiry
				}
			)
			await newUser.save();

			await transporter.sendMail(
				{
					to: email,
					subject: "OTP for Registering",
					text: `Your OTP is ${otp}. it is valid for 10 minutes`
				}
			)

			return res.status(200).json(
				{
					message: "OTP sent successfully!!!",
					success: true
				}
			)
		}

	} catch (error) {
		return res.status(500).json(
			{
				message: "Server error!!!",
				error: error.message,
				success: false
			}
		)
	}
}

export const verifyOTP = async (req, res) => {

	const { email, otp } = req.body;

	try {
		if (!email) {
			return res.status(400).json(
				{
					message: "Please enter the valid email!!!",
					success: false
				}
			)
		}

		const user = await User.findOne({ email, otp })

		if (!user) {
			return res.status(401).json(
				{
					message: "Invalid OTP",
					success: false
				}
			)
		}

		if (user.otp_expiry < Date.now()) {
			return res.status(401).json(
				{
					message: "OTP expired",
					success: false
				}
			)
		}

		const token = jwt.sign({ data: { _id: user._id } }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

		user.otp = null;
		user.otp_expiry = null;
		await user.save();

		return res.status(200).json(
			{
				message: "OTP verified successfully!!!",
				token: token,
				data: {
					id: user._id,
					email: user.email,
				},
				success: true
			}
		)

	} catch (error) {
		return res.status(500).json(
			{
				message: "Server error!!!",
				error: error.message,
				success: false
			}
		)
	}
}


export const updateProfile = async (req, res) => {

	const { userID } = req.params;

	const { first_name, middle_name, last_name, gender, date_of_birth } = req.body;

	try {

		const user = await User.findById(userID);

		if (!user) {
			return res.status(404).json(
				{
					message: "User not found!!!",
					success: false
				}
			)
		}

		user.first_name = first_name;
		user.middle_name = middle_name;
		user.last_name = last_name;
		user.gender = gender;
		user.date_of_birth = date_of_birth;

		await user.save();

		return res.status(200).json(
			{
				message: "Profile Updated successfully!!!",
				success: true
			}
		)

	} catch (error) {
		return res.status(500).json(
			{
				message: "Server error!!!",
				error: error.message,
				success: false
			}
		)
	}
}
