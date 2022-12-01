module.exports = app => {
  const categories = require("../controllers/categories.controller.js");

  var router = require("express").Router();

  router.get('/', categories.findAll);

  app.use('/api/categories', router);
};
