const Contact = require("../models/contact");

exports.addContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: "success",
      data: contact
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      message: "success",
      data: contacts
    });
  } catch (err) {
    console.log(err);
  }
};
