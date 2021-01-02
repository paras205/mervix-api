const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorHandler");
const bannerRoutes = require("./routes/banner");
const aboutRoutes = require("./routes/about");
const clientRoutes = require("./routes/client");
const productRoutes = require("./routes/product");
const testimonialRoutes = require("./routes/testimonial");
const serviceRoutes = require("./routes/service");
const faqRoutes = require("./routes/faq");
const contactRoutes = require("./routes/contact");
const settingRoutes = require("./routes/setting");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads/images/", [express.static(__dirname + "/uploads/images")]);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/banners", bannerRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/settings", settingRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(globalErrorHandler);

module.exports = app;
