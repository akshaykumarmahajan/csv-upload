const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const productController = require("../controllers/productController");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };

const fileUpload = multer({
  storage: storage,
  // fileFilter: fileFilter
});

router.post(
  "/importProductData",
  fileUpload.single("file"),
  productController.importProductData
);

module.exports = router;
