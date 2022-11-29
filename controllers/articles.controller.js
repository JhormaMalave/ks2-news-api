const db = require("../models");

const Article = db.Article;

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  Article.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrió un error al obtener los artículos."
    });
  });
};
