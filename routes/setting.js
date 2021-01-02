const express = require("express");
const settingController = require("../controllers/setting");
const imageUpload = require("../utils/multer");

const router = express.Router();

router.route("/").get(settingController.getSettings);

router
  .route("/:id")
  .put(imageUpload.single("image"), settingController.updateSettings)
  .get(settingController.getSettings);

router
  .route("/")
  .post(imageUpload.single("image"), settingController.updateSettings);

module.exports = router;
