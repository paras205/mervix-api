const mongoose = require("mongoose");
const slugify = require("slugify");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String
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
    websiteLink: {
      type: String
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
clientSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
