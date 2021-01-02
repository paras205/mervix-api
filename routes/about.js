const express = require("express");
const aboutController = require("../controllers/about");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), aboutController.addAbout)
  .get(aboutController.getAllAbout);

router
  .route("/:slug")
  .get(aboutController.getOneAbout)
  .put(imageUpload.single("image"), aboutController.updateAbout)
  .delete(aboutController.deleteAbout);

module.exports = router;
