const { Op } = require('sequelize');
const db = require('../models');

const Article = db.Article;

// Retrieve all Articles from the database.
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.findByPk(id, {include: [{model: db.Category, as: 'category'}]});
    if (article) {
      res.send(article);
    } else {
      res.status(404).send({
        message: 'El artículo no fue encontrado'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Ocurrió un error al obtener el artículo.'
    });
  }
};

exports.findAll = async (req, res) => {
  const search = req.query.search ? req.query.search : '';

  try {
    const articles = await Article.findAll({
      include: [{model: db.Category, as: 'category'}],
      where: {
        title: {[Op.iLike]: `%${ search }%`}
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.send(articles);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Ocurrió un error al obtener los artículos.'
    });
  }
};

exports.create = async (req, res) => {
  // Validate request
  const checkIsEmpty = (Object.keys(req.body).length === 0);

  if (checkIsEmpty) {
    res.status(400).send({
      message: 'Debes rellenar todos los campos'
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
        err.message || 'Ocurrio un error al guardar el artículo.'
    });
  };
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.update(req.body, {
      where: { id: id }
    });

    if (article == 1) {
      res.send({
        message: 'El artículo fue actualizado exitosamente.'
      });
    } else {
      res.send({
        message: 'No se pudo actualizar el artículo, revisa que llenaste los campos correctamente.',
      });
    }
  } catch(err) {
      res.status(500).send({
        message: 'Error al actualizar el artículo'
      });
  };
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.destroy({where: { id: id }});
    console.log(article);

    if (article == 1) {
      res.send({
        message: 'El articulo fue eliminado existosamente!'
      });
    } else {
      res.send({
        message: 'No se pudo eliminar el artículo, revisa de que el artículo existe'
      });
    }

  } catch(err) {
    res.status(500).send({
      message: 'No se pudo eliminar el artículo'
    });
  };
};
