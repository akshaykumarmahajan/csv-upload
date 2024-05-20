const log4js = require("log4js");
const logger = log4js.getLogger('app');
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
  logger.info("Inside shippment")
  try {
    const allowedExtension = /(\.csv)$/i;
    if (allowedExtension.exec(path.extname(req.file.originalname))) {
      csv()
      .fromFile(req.file.path)
      .then(async (response) =>{
        console.log("befor filter", response, response.length)

        let uniqueData = response.filter((e,i)=>{
          return response.findIndex((x)=>{
            return x.csk_Id == e.csk_Id && x.severity == e.severity;
          }) == i
        })
        console.log("after filter", uniqueData, uniqueData.length)
      })
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
