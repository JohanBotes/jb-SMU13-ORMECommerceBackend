const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // Get all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [ 
        { model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']}
      ]
    });

    res.status(200).json(categoryData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // Get one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock']
    }]
    })
  .then(dataC => {
    if (!dataC) {
      res.status(404).json({ message: 'No category for this ID'});
      return;
    }
    res.json(dataC);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then (dataC => res.json(dataC))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body, {
      where: { id: req.params.id }
    }
  )
  .then(dataC => {
    if (!dataC) {
      res.status(404).json({ message: 'No category for this ID'})
      return;
    }
    res.json(dataC)
    }
  )
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// DELETE a Category

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;