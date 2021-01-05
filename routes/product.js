const express = require("express");
const productController = require("../controllers/product");
const imageUpload = require("../utils/multer");

const router = express.Router();

const up = imageUpload.fields([
  { name: "image", maxCount: 1 },
  { name: "productImages", maxCount: 8 }
]);

router
  .route("/category")
  .post(imageUpload.single("image"), productController.addCategory)
  .get(productController.getAllCategory);

router
  .route("/category/:slug")
  .get(productController.getCategory)
  .put(imageUpload.single("image"), productController.updateCategory)
  .delete(productController.deleteCategory);

router
  .route("/")
  .post(up, productController.addProduct)
  .get(productController.getAllProducts);

router
  .route("/:slug")
  .get(productController.getProduct)
  .put(up, productController.updateProduct)
  .delete(productController.deleteProduct);

router.get("/getProduct/byCategory", productController.getProductByCategory);

module.exports = router;
