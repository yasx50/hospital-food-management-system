const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
  deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel' },
  status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
  deliveryTime: { type: Date },
  notes: { type: String },
});

module.exports = mongoose.model('Delivery', deliverySchema);
