import products from "../models/products.js";

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
  
  
// get product by id 
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
// Get products by category
export const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params; // Get categoryId from request parameters
  
    try {
      // Call the service function to get products by category
      const productsData = await products.getProductsByCategory(categoryId);
  
      if (productsData.length === 0) {
        return res.status(404).json({ message: 'No products found for this category' });
      }
  
      // Respond with the products
      return res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: productsData
      });
    } catch (error) {
      // Log the detailed error message
      console.error('Error fetching products by category:', error);
  
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message // Provide error message for debugging
      });
    }
  };
  
// update product by id 
export const updateproductByID = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  const imageBuffer = req.file ? req.file.buffer : null; // Assuming you're using multer for file upload

  try {
    const updatedProduct = await products.updateProductById(productId,productData,imageBuffer);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error); // Log the error for debugging

    res.status(400).json({
      success: false,
      message: 'Unable to update product',
      error: error.message,
    });
  }
};

 // delete product by id 
 export const deleteproduct = async (req, res) => {
  try {
    
    const product = await products.deleteProductById( req.params.id);
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
};
