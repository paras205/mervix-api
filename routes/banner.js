const express = require("express");
const bannerController = require("../controllers/banner");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), bannerController.addBanner)
  .get(bannerController.getAllBanner);

module.exports = router;
