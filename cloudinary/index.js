const cloudinary = require("cloudinary").v2;
const multerStorageCloudinary = require("multer-storage-cloudinary");
const multer = require("multer");

const CloudinaryStorage =
  multerStorageCloudinary.CloudinaryStorage ||
  multerStorageCloudinary.default ||
  multerStorageCloudinary;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_KEY || "",
  api_secret: process.env.CLOUDINARY_SECRET || "",
});

const storageOptions = {
  cloudinary,
  params: {
    folder: "yelpcamp",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
};

const storage =
  typeof CloudinaryStorage === "function" &&
  CloudinaryStorage.prototype &&
  typeof CloudinaryStorage.prototype._handleFile === "function"
    ? new CloudinaryStorage(storageOptions)
    : typeof multerStorageCloudinary.createCloudinaryStorage === "function"
      ? multerStorageCloudinary.createCloudinaryStorage(storageOptions)
      : CloudinaryStorage(storageOptions);

const upload = multer({ storage });

module.exports = {
  cloudinary,
  storage,
  upload,
};
