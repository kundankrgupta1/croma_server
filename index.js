import app from "./src/app.js";
import connectDatabse from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDatabse().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Database connected successfully!!!`);
		console.log(`Server is running on PORT ${process.env.PORT}`);
	})
}).catch((error) => {
	console.log(`Database connection failed!!!!, ${error}`);
})
