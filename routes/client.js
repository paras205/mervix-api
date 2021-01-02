const express = require("express");
const clientController = require("../controllers/client");
const imageUpload = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(imageUpload.single("image"), clientController.addClient)
  .get(clientController.getAllClients);

router
  .route("/:slug")
  .get(clientController.getClient)
  .put(imageUpload.single("image"), clientController.updateClient)
  .delete(clientController.deleteClient);

module.exports = router;
