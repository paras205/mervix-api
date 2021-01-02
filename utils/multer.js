const multer = require("multer");
const path = require("path");
const AppError = require("./appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return new AppError("Allowed only .png, .jpg, .jpeg and .gif", 400);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

module.exports = upload;
