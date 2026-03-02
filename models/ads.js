const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PLATFORMS } = require("../data/lucknowReviews");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_400");
});

const PlatformReviewSchema = new Schema(
  {
    platform: {
      type: String,
      enum: PLATFORMS,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    sourceUrl: String,
  },
  { _id: false }
);

const opts = { toJSON: { virtuals: true } };

const AdsSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: {
      type: String,
      default: "Lucknow, Uttar Pradesh",
    },
    category: {
      type: String,
      enum: PLATFORMS,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "published"],
      default: "published",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    platformReviews: [PlatformReviewSchema],
  },
  { ...opts, timestamps: true }
);

module.exports = mongoose.model("Ads", AdsSchema);
