const express = require("express");
const bannerController = require("../controllers/banner");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), bannerController.addBanner)
  .get(bannerController.getAllBanner);

router
  .route("/:slug")
  .get(bannerController.getBanner)
  .put(imageUpload.single("image"), bannerController.updateBanner)
  .delete(bannerController.deleteBanner);

module.exports = router;
