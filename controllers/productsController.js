import axios from 'axios';
import Product from '../models/products.js';



const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get products',
      error: error,
    });
  }
};

const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.ID);
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get product by ID',
      error: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('key', 'b0d1b56c0010dec4f908278b9d4430d6');
    formData.append('image', req.file.buffer.toString('base64'));

    const response = await axios.post('https://api.imgbb.com/1/upload', formData);
    const imageURL = response?.data?.data?.url;

    const product = await Product.create({
      ...req.body,
      image: imageURL,
    });

    res.status(200).json({
      success: true,
      message: 'Product added successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Product not added successfully',
      error: error,
    });
  }
};

const updateProductByID = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.ID, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to update product',
      error: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.ID });
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error occurred while deleting the product',
      error: error,
    });
  }
};
export {
  getAllProducts,
  getProductByID,
  addProduct,
  updateProductByID,
  deleteProduct,
};

