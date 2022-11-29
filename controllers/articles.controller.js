const db = require("../models");

const Article = db.Article;

// Retrieve all Articles from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;

  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Ocurrió un error al obtener los artículos."
    });
  }
};


exports.create = (req, res) => {

};
