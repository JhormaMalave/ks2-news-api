const { Op } = require('sequelize');
const db = require('../models');

const Category = db.Category;

// Retrieve all Articles from the database.
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [
        ['name', 'ASC']
      ]
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Ocurrió un error al obtener los artículos.'
    });
  }
};
