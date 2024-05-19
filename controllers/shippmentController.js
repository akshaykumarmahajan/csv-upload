const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

let mandatory_header = [
  "csk_Id",
  "vullink",
  "actual_price",
  "discounted_price",
  "discount",
  "category",
  "sub_category",
  "severity",
];

exports.importShippmentData = async (req, res) => {
  try {
    const allowedExtension = /(\.csv)$/i;
    if (allowedExtension.exec(path.extname(req.file.originalname))) {
      const jsonArray = csv()
        .fromFile(req.file.path)
        .then((response) => {
          console.log("res", response);
        });

      const header = csv()
        .fromString(req.file.path)
        .then(function (jsonArray) {
          console.log("hhh", jsonArray);
        });
    } else {
      fs.unlink(req.file.path, (err) => {
        console.log("file deleted successfully");
      });
      throw new Error("Please upoad file having extension .csv only.");
    }
  } catch (err) {
    res.status(500);
    res.send({ status: "failed", message: err.message });
  }
};
