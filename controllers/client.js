const Client = require("../models/clients");

exports.addClient = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const client = await Client.create({ ...req.body, image });
    res.status(201).json({
      message: "success",
      data: client
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllClients = async (req, res) => {
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
    const count = await Client.countDocuments({ ...keyword });
    const client = await Client.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: client
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "success",
      data: client
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateClient = async (req, res, next) => {
  try {
    const image = {
      url: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`,
      alt: req.body?.image?.alt,
      caption: req.body?.image?.caption
    };
    const client = await Client.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, image },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: client
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findOneAndDelete({ slug: req.params.slug });
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
