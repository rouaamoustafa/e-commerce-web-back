import products from '../models/products.js';

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


/*const getAllproducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: products,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'unable to get data',
      error: error,
    });
  }
};

const getproductByID = async (req, res) => {
  try {
    // const product = await product.find({ _id: req.params.ID });
    const product = await product.findById(req.params.ID);
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
};*/

 /*export const addproduct = async (req, res) => {
   const { name, category_id, price,stock_quantity,description } = req.body;

  try {
    const formData = new FormData();
    formData.append('key', 'fc45b9bc491df49d8c66b1f010c647ae');
    formData.append('image', req.file.buffer.toString('base64'));
    const response = await axios.post(
      'https://api.imgbb.com/1/upload',
      formData
    );

    const imageURL = response?.data?.data?.url;

    const product = await products.create({
      ...req.body,
      image: imageURL,
    });
    res.status(200).json({
      success: true,
      message: 'product added successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'product not added successfully',
      error: error,
    });
  }
};*/

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