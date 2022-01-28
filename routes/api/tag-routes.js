const router = require('express').Router();
const { json } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }],
    });
    res.json(tags);
  } catch (e) {
    res.json(e)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }]
    })
    res.json(tags);
  } catch (e) {
    res.json(e)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({
      tag_name,
    })
    res.json(newTag);
  } catch (e) {
    res.json(e)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  try {
    await Tag.update({
      tag_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
    );
    const newTag = await Tag.findByPk(req.params.id)
    res.json(newTag);
  } catch (e) {
    res.json(e)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    await deletedTag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedTag);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
