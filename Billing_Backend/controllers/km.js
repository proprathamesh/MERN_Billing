const Billing = require('../models/km');

// Create a new billing record
exports.createBilling = async (req, res) => {
  try {
    const billingData = { ...req.body, amount: 0, uid: req.user._id };
    const billing = new Billing(billingData);
    const savedBilling = await billing.save();
    res.status(201).json(savedBilling);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all billing records
exports.getBillings = async (req, res) => {
  try {
    const billings = await Billing.find({ uid: req.user._id }).populate('carId');
    res.status(200).json(billings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a billing record by ID
exports.getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate('carId');
    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a billing record
exports.updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBilling) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a billing record
exports.deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.status(200).json({ message: 'Billing record deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
