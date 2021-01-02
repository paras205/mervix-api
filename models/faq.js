const mongoose = require("mongoose");
const slugify = require("slugify");

const faqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    isPublish: {
      type: Boolean,
      required: true
    },
    display_order: {
      type: Number
    }
  },
  { timestamps: true }
);

faqSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Faq = mongoose.model("Faq", faqSchema);
module.exports = Faq;
