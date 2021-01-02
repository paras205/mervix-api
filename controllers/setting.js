const Settings = require("../models/setting");

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json({
      status: "success",
      results: settings.length,
      data: settings
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let body = {
      ...req.body,
      image: `${
        req.connection && req.connection.encrypted ? "https" : "http"
      }://${req.get("host")}/uploads/images/${req.file.filename}`
    };
    let id =
      req.params != undefined && req.params.id != undefined
        ? req.params.id
        : null;
    if (id == null) {
      const set = await Settings.find();
      if (set.length == 0) {
        const cur = await Settings.create(body);
        id = cur._id;
      } else {
        id = set[0]._id;
      }
    }
    const query = await Settings.findOneAndUpdate({ _id: id }, body, {
      new: true
    });
    res.status(201).json({
      status: "success",
      data: query
    });
  } catch (err) {
    console.log(err);
  }
};
