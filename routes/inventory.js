const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Routes for Inventory Management
router.get('/', inventoryController.getAllItems);
router.post('/', inventoryController.addItem);
router.get('/:id', inventoryController.getItemById);
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;

