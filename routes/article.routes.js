module.exports = app => {
  const articles = require("../controllers/articles.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get('/', articles.findAll);
  router.post('/', articles.create);
  router.put('/:id', articles.update);

  app.use('/api/articles', router);
};
