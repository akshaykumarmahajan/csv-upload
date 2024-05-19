const log4js = require("log4js");
const logger = log4js.getLogger("app");
logger.level = process.env.LOGGER_LEVEL;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes/main");

try {
  const app = express();
  const port = process.env.PORT || 5003;
  const DATABASE_URL = process.env.DATABASEURL || "mongodb://localhost:27017";

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // CORS Policy
  app.use(cors());

  // Database Connection
  connectDB(DATABASE_URL);

  // JSON
  app.use(express.json());

  // Load Routes
  app.use(routes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  process.on("SIGTERM", function () {
    logger.info("SIGTERM signal received");
    logger.info("Closing http server");
    server.close(function () {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  });
} catch (error) {
  logger.info("Exception " + error.message);
  logger.info("Exception stack trace " + error.stack);
}
