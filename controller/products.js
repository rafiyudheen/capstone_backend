const PRODUCT_MODEL = require("../models/productModel");

const getAllActiveProducts = async (req, res) => {
  try {
    const activeProducts = await PRODUCT_MODEL.find({ ISACTIVE: true })
      .populate("APPROVED_BY", "USER_NAME FULL_NAME")
      .populate("CATEGORY_ID", "CATEGORY_NAME");
    if (!activeProducts.length) {
      return res.status(404).json({ message: "No active products found." });
    }
    res.status(200).json({
      message: "Active products retrieved successfully.",
      data: activeProducts,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Failed to retrieve active products.",
    });
  }
};

const getNonActiveProducts = async (req, res) => {
  try {
    const nonActiveProducts = await PRODUCT_MODEL.find({ ISACTIVE: false })
      .populate("APPROVED_BY", "USER_NAME FULL_NAME")
      .populate("CATEGORY_ID", "CATEGORY_NAME");
    if (!nonActiveProducts.length) {
      return res.status(404).json({ message: "No inactive products found." });
    }
    res.status(200).json({
      message: "Inactive products retrieved successfully.",
      data: nonActiveProducts,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to retrieve inactive products.",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { PRODUCT_NAME, CATEGORY_ID, SELLING_PRICE, DESCRIPTION, PHOTOS } =
      req.body;

    if (!PRODUCT_NAME || !SELLING_PRICE) {
      return res
        .status(400)
        .json({ message: "PRODUCT_NAME and SELLING_PRICE are required." });
    }

    const newProduct = new PRODUCT_MODEL({
      PRODUCT_NAME,
      CATEGORY_ID,
      SELLING_PRICE,
      DESCRIPTION,
      PHOTOS,
      APPROVED: false,
      ISACTIVE: true,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product added successfully.",
      data: savedProduct,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to add product.",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      id,
      PRODUCT_NAME,
      CATEGORY_ID,
      SELLING_PRICE,
      DESCRIPTION,
      PHOTOS,
    } = req.body;

    const updatedProduct = await PRODUCT_MODEL.findByIdAndUpdate(
      id,
      {
        PRODUCT_NAME,
        CATEGORY_ID,
        SELLING_PRICE,
        DESCRIPTION,
        PHOTOS,
        APPROVED: false,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to update product.",
    });
  }
};

const deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deactivatedProduct = await PRODUCT_MODEL.findByIdAndUpdate(
      id,
      { ISACTIVE: false },
      { new: true }
    );

    if (!deactivatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product deactivated successfully.",
      data: deactivatedProduct,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to deactivate product.",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await PRODUCT_MODEL.findById(id)
      .populate("APPROVED_BY", "USER_NAME FULL_NAME")
      .populate("CATEGORY_ID", "CATEGORY_NAME");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to retrieve product.",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await PRODUCT_MODEL.find({
      CATEGORY_ID: categoryId,
      ISACTIVE: true,
    }).populate("CATEGORY_ID", "CATEGORY_NAME");

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found in this category." });
    }

    res.status(200).json({
      message: "Products retrieved by category successfully.",
      data: products,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to retrieve products by category.",
    });
  }
};

module.exports = {
  getAllActiveProducts,
  getNonActiveProducts,
  addProduct,
  editProduct,
  deactivateProduct,
  getProductById,
  getProductsByCategory,
};
