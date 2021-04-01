const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
  const allTags = await Tag.findAll(
    {
      include: {
        model: Product,
        required: true
      }
    }
  )
  // be sure to include its associated Product data
  res.json(allTags);
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
  const oneTag = await Tag.findByPk(req.params.id,
    { 
      include: { 
        model: Product, 
        required: true 
      } 
    }
    )
  // be sure to include its associated Product data
  res.json(oneTag);
      }catch(err){
        console.log(err);
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
  const newTag= await Tag.create(res.body);
  res.json(newTag);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
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
  res.json(updateTag);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
  const tagDel = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    }
  });
  res.json(tagDel);
}catch(err){
  console.log(err)
  res.status(500).json(err);
}
});

module.exports = router;
