const express = require("express");
const router = express.Router();

router.use("/api/product", require("./product.js"));
router.use("/api/shippment", require("./shippment.js"));

module.exports = router;
