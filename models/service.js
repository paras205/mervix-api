const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    companyName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number
    },
    position: {
      type: String
    },
    companyAddress: {
      type: String
    },
    display_order: {
      type: Number
    },
    image: {
      alt: {
        type: String
      },
      caption: {
        type: String
      },
      url: {
        type: String,
        required: true
      }
    },
    isPublish: {
      type: Boolean
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

serviceSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
