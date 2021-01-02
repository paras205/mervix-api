const Product = require("../models/product");
const Category = require("../models/product-category");
const AppError = require("../utils/appError");

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      image: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`
    });
    res.status(201).json({
      message: "success",
      data: category
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(201).json({
      message: "success",
      data: category
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return new AppError("Item not found", 400);
    }
    res.status(200).json({
      message: "success",
      data: category
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: category
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ slug: req.params.slug });
    res.status(204).json({
      message: "success"
    });
  } catch (err) {
    res.status(404).json({
      message: "Fail",
      err
    });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    let productImages = [];
    if (req.files && req.files.productImages) {
      req.files.productImages.forEach((element) => {
        productImages.push(
          `${
            req.connection && req.connection.encrypted ? "https" : "http"
          }://${req.get("host")}/uploads/images/${element.filename}`
        );
      });
    }
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.files?.image[0]?.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const product = await Product.create({ ...req.body, image, productImages });
    res.status(201).json({
      message: "success",
      data: product
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i"
          }
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .populate("category")
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: products
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
