const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: Date, required: true },
  pickupAddress: { type: String, required: true },
  dropAddress: { type: String, required: true },
  driverName: { type: String, required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  rate: { type: Number, required: true },
  toll: { type: Number, required: true },
  parking: { type: Number, required: true },
  advance: { type: Number, required: true },
  amount: { type: Number, required: true },
  startKm: { type: Number, required: true },
  endKm: { type: Number, required: true },
  haltCharges: { type: Number, required: true },
  foodCharges: { type: Number, required: true },
  overtime: { type: Number, required: true },
  signature: { type: String, required: true },
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
