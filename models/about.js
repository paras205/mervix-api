const mongoose = require("mongoose");
const slugify = require("slugify");

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true
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
      type: Boolean,
      required: true
    },
    isHomeAbout: {
      type: Boolean
    },
    display_order: {
      type: Number,
      unique: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
aboutSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const About = mongoose.model("About", aboutSchema);
module.exports = About;
