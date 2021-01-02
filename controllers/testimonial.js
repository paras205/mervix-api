const Testimonial = require("../models/testimonial");

exports.addTestimonial = async (req, res) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file?.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const testimonial = await Testimonial.create({ ...req.body, image });
    res.status(201).json({
      message: "success",
      data: testimonial
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllTestimonial = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i"
          }
        }
      : {};
    const count = await Testimonial.countDocuments({ ...keyword });
    const testimonials = await Testimonial.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: testimonials
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "success",
      data: testimonial
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const testimonial = await Testimonial.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: testimonial
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findOneAndDelete({ slug: req.params.slug });
    res.status(204).json({
      message: "success"
    });
  } catch (err) {
    res.status(404).json({
      message: "Fail",
      err
    });
  }
};
