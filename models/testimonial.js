const mongoose = require("mongoose");
const slugify = require("slugify");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      sparse: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true
    },
    companyName: {
      type: String
    },
    phone_number: {
      type: String,
      required: true
    },
    position: {
      type: String
    },
    address: {
      type: String
    },
    isPublish: {
      type: Boolean
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
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
testimonialSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
