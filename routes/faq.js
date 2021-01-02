const express = require("express");
const faqController = require("../controllers/faq");

const router = express.Router();

router.route("/").post(faqController.addFaq).get(faqController.getAllFaq);

router
  .route("/:slug")
  .get(faqController.getSingleFaq)
  .put(faqController.updateFaq)
  .delete(faqController.deleteFaq);

module.exports = router;
