const Car = require('../models/car');
const axios = require('axios');

const defaultUrl = process.env.DEFAULT_URL;

// Create a new car
exports.createCar = async (req, res) => {
  const { model, number } = req.body;
  const token = req.headers.authorization;

  try {
    const response = await axios.get(`${defaultUrl}/api/protected`, {
      headers: {
        Authorization: `${token}`
      }
    });

    const userId = response.data.user._id;
    console.log(userId);

    const carExists = await Car.findOne({ number });

    if (carExists) {
      return res.status(400).json({ message: 'Car with this number already exists' });
    }

    const car = await Car.create({
      model,
      number,
      userId,
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  const { model, number } = req.body;

  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.model = model || car.model;
    car.number = number || car.number;

    const updatedCar = await car.save();
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.remove();
    res.status(200).json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars by user ID
exports.getCarsByUserId = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const response = await axios.get(`${defaultUrl}/api/protected`, {
      headers: {
        Authorization: `${token}`
      }
    });

    const userId = response.data._id;
    const cars = await Car.find({ userId });

    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars found for this user' });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
