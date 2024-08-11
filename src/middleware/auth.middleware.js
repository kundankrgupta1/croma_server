import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(400).json({
				message: "Token not provided!",
				success: false
			});
		}

		jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
			if (error) {
				console.error("JWT verification error:", error);
				return res.status(401).json({
					message: "Failed authentication!",
					success: false
				});
			}

			req.user = decoded.data;
			next();
		});
	} catch (error) {
		console.error("Error while checking session expiry:", error);
		return res.status(500).json({
			message: "Error while checking session expiry",
			success: false
		});
	}
}

export default authMiddleware;
