const CART_MODEL = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const ITEMS = req.body.ITEMS;
    const USER_ID = req.body.USER_ID;
    const TOTAL_AMOUNT = req.body.TOTAL_AMOUNT;

    let cart = await CART_MODEL.findOne({ USER_ID: USER_ID });

    if (!cart) {
      cart = new CART_MODEL({
        USER_ID: USER_ID,
        ITEMS: ITEMS,
        TOTAL_AMOUNT: TOTAL_AMOUNT,
      });
    } else {
      cart.USER_ID = USER_ID;
      cart.ITEMS = ITEMS;
      cart.TOTAL_AMOUNT = TOTAL_AMOUNT;
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
    const cart = await CART_MODEL.findOne({ USER_ID: userId });
    // .populate(
    //   "ITEMS.PRODUCT_ID",
    //   "PRODUCT_NAME SELLING_PRICE PHOTOS"
    // ); // Populating product details like name, price, and image

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getUserCart };
