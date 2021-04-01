const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allCats = await Category.findAll({
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    });
    // be sure to include its associated Products
    res.json(allCats);
  } catch (err) {
    console.status(240).console(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    });
    // be sure to include its associated Products
    res.json(oneCat);
  } catch (err) {
    console.status(240).console(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.json(newCat);
  } catch (err) {
    console.status(240).console(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(catData);
  } catch (err) {
    console.status(240).console(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(catData);
  } catch (err) {
    console.status(240).console(err);
  }
});

module.exports = router;
