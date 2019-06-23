const ObjectStore = require("../models/Resource_objects");
const getObject = async (parentId = null) => {
  return await ObjectStore.find({ parent: parentId }).exec();
};

module.exports = { getObject };
