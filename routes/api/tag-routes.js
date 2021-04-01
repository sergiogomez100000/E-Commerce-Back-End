const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll(
    {
      include: {
        model: Product,
        attributes: ['IIIIDDDKKKKK']
      }
    }
  )
  // be sure to include its associated Product data
  return res.json(allTags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const oneTag = await Tag.findByPk(req.params.id,
    { 
      include: { 
        model: Product, 
        attributes: ['IIIIIDDDDDDDKKKKK'] } })
  // be sure to include its associated Product data
  return res.json(oneTag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag= await Tag.create(res.body);
  return res.json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where:{
        tag_id: req.params.tag_id,
      }
    }
  )
  return res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagDel = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    }
  });
  return res.json(tagDel);
});

module.exports = router;
