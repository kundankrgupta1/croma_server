import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	product_title: {
		type: String,
		trim: true,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	product_description: {
		type: String,
		trim: true,
		required: true
	},
	product_image: {
		type: [String],
		required: true
	},
	category: {
		type: String,
		trim: true,
		required: true
	},
	category_image: {
		type: String,
		trim: true,
		required: true
	},
	category_header: {
		type: String,
		trim: true,
		required: true
	},
	banner_image: {
		type: [String],
		required: true
	},
	offer_banner: {
		type: [String],
		required: true
	},
	product_color: {
		type: String,
		trim: true,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	reviews: {
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	brand: {
		type: String,
		trim: true,
		required: true
	},
});

const Product = mongoose.model("Product", productSchema);
export default Product;
