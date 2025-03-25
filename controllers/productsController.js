
import products from '../models/products.js';

//add product with image 
export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const newProduct = await products.addProduct(req.body, req.file.buffer);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product not added successfully",
      error: error.message,
    });
  }
};

// get all products 
export const getAllProducts = async (req, res) => {
    try {
      // Call the model function to get all products with images
      const productss = await products.getAllProducts();
  
      // Send the response with the products data
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: productss,
      });
    } catch (error) {
      // Handle any errors during fetching the products
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message,
      });
    }
  };
  
  

 export const getproductByID = async (req, res) => {
  try {
    const product = await products.findProductById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'unable to get product by ID',
      error: error,
    });
  }
};

/*const updateproductByID = async (req, res) => {
  try {
    const product = await product.findByIdAndUpdate(req.params.ID, req.body);
    res.status(200).json({
      success: true,
      message: 'product updated successfully.',
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

export const deleteproduct = async (req, res) => {
  try {
    const product = await product.deleteOne({ _id: req.params.ID });
    res.status(200).json({
      success: true,
      message: 'product deleted successfully',
      product: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error occured while deleting the product',
      error: error,
    });
  }
};*/