const express = require('express');
const Item = require('../models/item');
const router = express.Router();

// Add new item
router.post('/add', async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newItem = new Item({ name, quantity, price });
    await newItem.save();
    res.status(201).send('Item added successfully');
  } catch (error) {
    res.status(400).send('Error adding item: ' + error.message);
  }
});

// Get all items and calculate total inventory value
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    const totalValue = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    res.json({ items, totalValue });
  } catch (error) {
    res.status(400).send('Error fetching items: ' + error.message);
  }
});

// Update item quantity
router.put('/update/:id', async (req, res) => {
  const { quantity } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).send('Error updating item: ' + error.message);
  }
});

// Delete an item
router.delete('/delete/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.send('Item deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting item: ' + error.message);
  }
});

module.exports = router;
