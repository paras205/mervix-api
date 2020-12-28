const express = require("express");
const contactController = require("../controllers/contact");

const router = express.Router();

router
  .route("/")
  .post(contactController.addContact)
  .get(contactController.getAllContact);

module.exports = router;
