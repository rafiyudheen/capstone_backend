const CART_MODEL = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const items = req.body.items;
    const userId = req.body.userId;
    const totalAmount = req.body.amount;

    let cart = await CART_MODEL.findOne({ USER_ID: userId });

    if (!cart) {
      cart = new CART_MODEL({
        USER_ID: userId,
        ITEMS: items,
        TOTAL_AMOUNT: totalAmount,
      });
    } else {
      cart.ITEMS = items;
      cart.TOTAL_AMOUNT = totalAmount;
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user's cart and populate the product details
    const cart = await CART_MODEL.findOne({ USER_ID: userId }).populate(
      "ITEMS.PRODUCT_ID",
      "name price image"
    ); // Populating product details like name, price, and image

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getUserCart };
