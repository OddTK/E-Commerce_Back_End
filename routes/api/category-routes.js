const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.json(categories);
  } catch (e) {
res.json(e)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {id: req.params.id},
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.json(category);
  } catch (e) {
    res.json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({
      category_name,
    });
    res.json(newCategory);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  try {
    await Category.update({
      category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    });
    const newCategory = await Category.findByPk(req.params.id);
    res.json(newCategory);
  } catch (e) {
    res.json(e)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.findById(req.params.id);
    await deletedCategory.destroy({
      where: {id: req.params.id}
    });
    res.json(deletedCategory);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
