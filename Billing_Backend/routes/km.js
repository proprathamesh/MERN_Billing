const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBilling,
  getBillings,
  getBillingById,
  updateBilling,
  deleteBilling
} = require('../controllers/km');

router.post('/', protect, createBilling);
router.get('/', protect, getBillings);
router.get('/:id', protect, getBillingById);
router.put('/:id', protect, updateBilling);
router.delete('/:id', protect, deleteBilling);

module.exports = router;
