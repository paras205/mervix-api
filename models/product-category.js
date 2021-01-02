const mongoose = require("mongoose");
const slugify = require("slugify");

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
productCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Category = mongoose.model("Category", productCategorySchema);

module.exports = Category;
