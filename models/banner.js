const mongoose = require("mongoose");
const slugify = require("slugify");

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
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

bannerSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
