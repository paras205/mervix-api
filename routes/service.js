const express = require("express");
const serviceController = require("../controllers/service");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), serviceController.addService)
  .get(serviceController.getAllService);

router
  .route("/:slug")
  .get(serviceController.getService)
  .put(imageUpload.single("image"), serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
