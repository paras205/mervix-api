const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String
    },
    sku: {
      type: String,
      unique: true
    },
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String
    },
    metaKeyWord: {
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
    productImages: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    weight: {
      type: Number
    },
    isPublish: {
      type: Boolean,
      required: true
    },
    isFeatured: {
      type: Boolean
    },
    dimension: {
      type: String
    },
    brand: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    manufacturer: {
      type: String
    },
    features: {
      type: String
    },
    additional_information: {
      type: String
    },
    shortDescription: {
      type: String
    },
    attributes: {
      type: String
    }
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
