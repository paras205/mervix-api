const Banner = require("../models/banner");

exports.addBanner = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const banner = await Banner.create({ ...req.body, image });
    res.status(201).json({
      message: "success",
      data: banner
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllBanner = async (req, res) => {
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
    const count = await Banner.countDocuments({ ...keyword });
    const banners = await Banner.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: banners
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "success",
      data: banner
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const banner = await Banner.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: banner
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await Banner.findOneAndDelete({ slug: req.params.slug });
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
