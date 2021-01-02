const Faq = require("../models/faq");

exports.addFaq = async (req, res, next) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({
      message: "success",
      data: faq
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllFaq = async (req, res) => {
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
    const count = await Faq.countDocuments({ ...keyword });
    const faq = await Faq.find({ ...keyword })
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      status: "success",
      results: count,
      page,
      pages: Math.ceil(count / pageSize),
      data: faq
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getSingleFaq = async (req, res) => {
  try {
    const faq = await Faq.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "success",
      data: faq
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      message: "success",
      data: faq
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findOneAndDelete({ slug: req.params.slug });
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
