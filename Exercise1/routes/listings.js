const express = require('express');
const router = express.Router();

let {
  getAllListings,
  getListingById,
  addListing,
  updateListing,
  removeListing
} = require('../controllers/listingController');

router.get('/', async (req, res) => {
  let response = await getAllListings();
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.get('/:id', async (req, res) => {
  let response = await getListingById(req.params.id);
  res.json(response);
});

router.post('/', async (req, res) => {
  let body = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  };
  let response = await addListing(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.put('/:id', async (req, res) => {
  let title = null, description = null, price = null;
  if (req.body.title) { title = req.body.title }
  if (req.body.description) { description = req.body.description }
  if (req.body.price) { price = req.body.price}
  let response = await updateListing(req.params.id, title, description, price);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.delete('/:id', async (req, res) => {
  let response = await removeListing(req.params.id);
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;