const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || "info",
  format: combine(timestamp(), json()),
//   defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    //  new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports = {
  logger,
};
