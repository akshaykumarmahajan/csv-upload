const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

let mandatory_header = [
  "name",
  "vullink",
  "actual_price",
  "discounted_price",
  "discount",
  "category",
  "sub_category",
  "bran",
];

async function compareHeaders(data) {
  console.log("abc", JSON.stringify(mandatory_header) === JSON.stringify(data));
  return JSON.stringify(mandatory_header) === JSON.stringify(data);
}

exports.importProductData = async (req, res) => {
  try {
    const allowedExtension = /(\.csv)$/i;
    if (allowedExtension.exec(path.extname(req.file.originalname))) {
      const jsonObj = await csv().fromFile(req.file.path);
      const csvHeader = Object.keys(jsonObj[0]);
      const result = compareHeaders(csvHeader);
      console.log(result, "result");
      if (result) {
        console.log(1);
        //get unique and insert to DB
      } else {
        console.log(2);
        res.status(400);
        res.send({ status: "failed", message: "CSV Header is not matching" });
      }
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
