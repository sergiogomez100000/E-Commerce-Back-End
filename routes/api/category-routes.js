const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allCats = await Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  );
  // be sure to include its associated Products

  return res.json(allCats);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const oneCat = await Category.findByPk(req.params.id,
    { 
      include: { 
        model: Product, 
        attributes: ['product_name'] } })
  // be sure to include its associated Products
  return res.json(oneCat)
});

router.post('/', async (req, res) => {
  // create a new category
  const catData = await Category.create(req.body);
  return res.json(catData);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  catData = await Category.update(
    {
      id: req.body.id,
      category_id: req.body.category_id,
    },
    {
      where:{
        category_id: req.params.category_id,
      }
    }
  )
  return res.json(catData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const catData = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    }
  });
  return res.json(catData)
});

module.exports = router;
