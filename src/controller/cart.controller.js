import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";


export const addToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.user?._id;

	if (!userId) {
		return res.status(401).json({
			message: "Login first!",
			success: false
		});
	}

	try {
		let cart = await Cart.findOne({ user: userId });
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
				success: false
			});
		}

		if (!cart) {
			cart = new Cart({
				user: userId,
				items: [],
				total_price: 0
			});
		}

		const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

		if (cartItemIndex > -1) {
			cart.items[cartItemIndex].quantity += quantity;
		} else {
			cart.items.push({ product: productId, quantity });
		}

		cart.total_price += product.price * quantity;

		await cart.save();

		return res.status(200).json({
			message: "Product added to cart successfully!",
			cart: cart,
			success: true
		});
	} catch (error) {
		console.error("Error adding product to cart:", error.message);
		return res.status(500).json({
			message: "Error adding product to cart",
			success: false
		});
	}
};
