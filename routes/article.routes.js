module.exports = app => {
  const articles = require("../controllers/articles.controller.js");

  var router = require("express").Router();

  router.get('/', articles.findAll);
  router.post('/', articles.create);
  router.get('/:id', articles.findOne);
  router.put('/:id', articles.update);
  router.delete('/:id', articles.delete);

  app.use('/api/articles', router);
};
