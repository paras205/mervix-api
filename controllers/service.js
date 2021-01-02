const Service = require("../models/service");

exports.addService = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const service = await Service.create({ ...req.body, image });
    res.status(201).json({
      message: "success",
      data: service
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllService = async (req, res) => {
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
    const count = await Service.countDocuments({ ...keyword });
    const services = await Service.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: services
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "success",
      data: service
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const service = await Service.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: service
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findOneAndDelete({ slug: req.params.slug });
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
