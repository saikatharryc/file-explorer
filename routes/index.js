const uploads = require("./uploads");

let api = {};
api.includeRoutes = app => {
  app.use("/uploads", uploads);
};
module.exports = api;
