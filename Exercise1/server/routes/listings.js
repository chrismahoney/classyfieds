const express = require('express');
const router = express.Router();

let {
  getAllListings,
  getListingById,
  addListing,
  updateListing,
  removeListing
} = require('../controllers/listingController');

/**
 * @swagger
 * /listings:
 *   get:
 *     description: All listings
 *     responses:
 *       200:
 *         description: Returns all current listings
 *       401:
 *         description: Unauthorized
 */
router.get('/', async (req, res) => {
  let response = await getAllListings();
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /listings/{id}:
 *   get:
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: string
 *       description: Listing ID
 *     description: Get listing by ID
 *     responses:
 *       200:
 *         description: Returns requested listing 
 */
router.get('/:id', async (req, res) => {
  let response = await getListingById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /listings:
 *   post:
 *     parameters:
 *     - in: body
 *       name: listing
 *       description: New listing
 *       schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           description:
 *             type: string
 *           price:
 *             type: number
 *     responses:
 *       201:
 *         description: Created listing OK 
 */
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

/**
 * @swagger
 * /listings/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: string
 *       description: Listing ID to update
 *     - in: body
 *       name: listing
 *       description: Updated listing
 *       schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           description:
 *             type: string
 *           price:
 *             type: number
 *     responses:
 *       201:
 *         description: Updated listing OK
 */
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

/**
 * @swagger
 * /listings/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: Listing ID to delete
 *     description: Delete listing by ID
 *     responses:
 *       200:
 *         description: Listing deleted OK
 */
router.delete('/:id', async (req, res) => {
  let response = await removeListing(req.params.id);
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;