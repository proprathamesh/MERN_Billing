const express = require('express');
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsByUserId
} = require('../controllers/car');
const { protect } = require('../middleware/authMiddleware');

// Route to create a new car
router.post('/', protect, createCar);

// Route to get all cars
router.get('/', protect, getAllCars);

// Route to get a single car by ID
router.get('/:id', protect, getCarById);

// Route to update car details
router.put('/:id', protect, updateCar);

// Route to delete a car
router.delete('/:id', protect, deleteCar);

// Route to get all cars by user ID
router.get('/user/:userId', protect, getCarsByUserId);

module.exports = router;
