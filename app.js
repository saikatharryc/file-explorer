const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes.includeRoutes(app);

app.use((err, req, res, next) => {
  const errorObj = {
    service: "upload_service"
  };
  if (err.status === 400) {
    if (err.validationErrors) {
      errorObj.validationErrors = err.validationErrors;
    }
    errorObj.message = err.message || "Invalid Values Supplied";
    errorObj.head = err.head || null;
  } else if (err.status === 401 || err.status === 403) {
    errorObj.head = err.head || null;
    errorObj.message = err.message || "Unauthorized User";
  } else if (err.status === 500) {
    errorObj.head = err.head || null;

    errorObj.message = err.message;

    errorObj.message = "Internal Server Error";
  } else if (err.status === 404) {
    errorObj.head = err.head || null;
    errorObj.message = err.message;
  } else {
    errorObj.head = err.head || null;

    errorObj.message = err.message || "Unknown Error Occurred";
  }

  next();

  return res.status(err.status || 500).json(errorObj);
});

rocess.on("SIGTERM", function() {
  //do something before Gracefully shut it down
  process.exit(0);
});
process.on("SIGINT", function() {
  //do something before Gracefully shut it down
  process.exit(0);
});

module.exports = app;
