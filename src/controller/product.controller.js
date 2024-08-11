import Product from "../model/product.model.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
	const {
		product_title, price, product_description, product_image, category, category_image, banner_image, offer_banner, product_color, rating, reviews, stock, brand, category_header
	} = req.body;

	try {
		const newProduct = new Product(
			{
				product_title, price, product_description, product_image, category, category_image, banner_image, offer_banner, product_color, rating, reviews, stock, brand, category_header
			}
		);

		await newProduct.save();

		return res.status(201).json(
			{
				message: "Product created successfully!",
				success: true
			}
		);
	} catch (error) {
		return res.status(500).json(
			{
				message: "Error creating product",
				success: false
			}
		);
	}
};



export const getCategory = async (req, res) => {
	try {
		// Use aggregation to get distinct categories with their images
		const categories = await Product.aggregate([
			{
				$group: {
					_id: "$category", // Group by category
					category_image: { $first: "$category_image" } // Get the first occurrence of category_image
				}
			},
			{
				$project: {
					_id: 0,             // Exclude the _id field
					category: "$_id",   // Rename _id to category
					category_image: 1   // Include category_image
				}
			}
		]);

		return res.status(200).json({
			message: "Category fetched successfully!",
			categories: categories,
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching categories",
			success: false
		});
	}
};


export const getCategoryWiseProduct = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		return res.status(200).json({
			message: "Products fetched successfully!",
			products: products,
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching products",
			success: false
		});
	}
}

export const getSingleProduct = async (req, res) => {
	const { _id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(400).json({
				message: "Invalid product ID",
				success: false
			});
		}

		const singleProduct = await Product.findById(_id);

		if (!singleProduct) {
			return res.status(404).json({
				message: "Product not found",
				success: false
			});
		}

		return res.status(200).json({
			message: "Product fetched successfully!",
			product: singleProduct,
			success: true
		});
	} catch (error) {
		console.error("Error fetching product:", error); // Log the error for debugging
		return res.status(500).json({
			message: "Error fetching product",
			success: false
		});
	}
}

