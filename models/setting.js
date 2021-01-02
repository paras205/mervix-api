const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      sparse: true
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    socialMedia: {
      facebook: {
        type: String
      },
      youtube: {
        type: String
      },
      instagram: {
        type: String
      },
      linkedIn: {
        type: String
      }
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
