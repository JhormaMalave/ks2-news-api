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


exports.create = async (req, res) => {
  // Validate request
  const checkIsEmpty = (Object.keys(req.body).length === 0);

  if (checkIsEmpty) {
    res.status(400).send({
      message: "Debes rellenar todos los campos"
    });
    return;
  }

  // Get params
  const articleParams = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    categoryId: req.body.categoryId
  };

  // Save Article in the database
  try {
    const article = await Article.create(articleParams)
    res.send(article);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al guardar el artículo."
    });
  };
};
