const express = require("express");
const testimonialController = require("../controllers/testimonial");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), testimonialController.addTestimonial)
  .get(testimonialController.getAllTestimonial);

router
  .route("/:slug")
  .get(testimonialController.getTestimonial)
  .put(imageUpload.single("image"), testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

module.exports = router;
