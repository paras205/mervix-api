const About = require("../models/about");
const appError = require("../utils/appError");

exports.addAbout = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const about = await About.create({ ...req.body, image });
    res.status(201).json({
      message: "success",
      data: about
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAbout = async (req, res) => {
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
    const count = await About.countDocuments({ ...keyword });
    const about = await About.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: about
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getOneAbout = async (req, res) => {
  try {
    const about = await About.findOne({ slug: req.params.slug });
    if (!about) {
      return new appError("Item not found", 400);
    }
    res.status(200).json({
      message: "success",
      data: about
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateAbout = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const about = await About.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: about
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await About.findOneAndDelete({ slug: req.params.slug });
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
