const express = require("express");
const testimonialController = require("../controllers/testimonial");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), testimonialController.addTestimonial)
  .get(testimonialController.getAllTestimonial);

module.exports = router;
