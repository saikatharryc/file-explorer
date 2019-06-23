const fileOps = require("./files");

let api = {};
api.includeRoutes = app => {
  app.use("/files", fileOps);
};
module.exports = api;
