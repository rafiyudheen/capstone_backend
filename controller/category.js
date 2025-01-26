const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { CATEGORY_NAME } = req.body;

    if (!CATEGORY_NAME) {
      return res.status(400).json({ message: "CATEGORY_NAME is required." });
    }

    const newCategory = new categoryModel({ CATEGORY_NAME });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to create category.",
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id, CATEGORY_NAME } = req.body;

    if (!CATEGORY_NAME) {
      return res.status(400).json({ message: "CATEGORY_NAME is required." });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { CATEGORY_NAME },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to update category.",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).json({
      message: "Categories retrieved successfully.",
      data: categories,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to retrieve categories.",
    });
  }
};

module.exports = {
  createCategory,
  editCategory,
  getAllCategories,
};
