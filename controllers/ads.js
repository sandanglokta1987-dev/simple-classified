const Ad = require("../models/ads");
const { cloudinary } = require("../cloudinary");
const { PLATFORMS, buildPlatformReviews } = require("../data/lucknowReviews");

module.exports.index = async (req, res) => {
  const { category } = req.query;
  let query = { status: "published", location: /lucknow/i };

  if (typeof category === "string" && category !== "all") {
    query.category = { $eq: category };
  }

  const ads = await Ad.find(query).populate("author");
  res.render("ads/index", {
    ads,
    selectedCategory: category || "all",
    platforms: PLATFORMS,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("ads/new", { platforms: PLATFORMS });
};

module.exports.createAd = async (req, res) => {
  const ad = new Ad(req.body.Ad);
  const files = Array.isArray(req.files) ? req.files : [];
  ad.images = files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  ad.author = req.user._id;
  ad.location = "Lucknow, Uttar Pradesh";
  ad.platformReviews = buildPlatformReviews();
  if (!ad.status) {
    ad.status = "published";
  }
  await ad.save();
  req.flash("success", "Hotel listing added for Lucknow!");
  res.redirect(`/ads/${ad._id}`);
};

module.exports.showAd = async (req, res) => {
  const ad = await Ad.findById(req.params.id).populate("author");
  if (!ad) {
    req.flash("error", "Cannot find that hotel listing!");
    return res.redirect("/ads");
  }

  if (!ad.platformReviews || !ad.platformReviews.length) {
    ad.platformReviews = buildPlatformReviews();
    await ad.save();
  }

  const avgRating = (
    ad.platformReviews.reduce((acc, review) => acc + review.rating, 0) /
    ad.platformReviews.length
  ).toFixed(1);

  res.render("ads/show", { ad, avgRating });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const ad = await Ad.findById(id);
  if (!ad) {
    req.flash("error", "Cannot find that hotel listing!");
    return res.redirect("/ads");
  }
  res.render("ads/edit", { ad, platforms: PLATFORMS });
};

module.exports.updateAd = async (req, res) => {
  const { id } = req.params;

  const ad = await Ad.findById(id);
  if (!ad) {
    req.flash("error", "Cannot find that hotel listing!");
    return res.redirect("/ads");
  }

  Object.assign(ad, req.body.Ad);
  ad.location = "Lucknow, Uttar Pradesh";

  if (req.files && req.files.length > 0) {
    const imgs = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    ad.images.push(...imgs);
  }

  if (req.body.deleteImages) {
    for (const filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    ad.images = ad.images.filter(
      (img) => !req.body.deleteImages.includes(img.filename)
    );
  }

  if (!ad.platformReviews || !ad.platformReviews.length) {
    ad.platformReviews = buildPlatformReviews();
  }

  await ad.save();

  req.flash("success", "Successfully updated hotel listing!");
  res.redirect(`/ads/${id}`);
};

module.exports.deleteAd = async (req, res) => {
  const { id } = req.params;
  await Ad.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted listing");
  res.redirect("/ads");
};
