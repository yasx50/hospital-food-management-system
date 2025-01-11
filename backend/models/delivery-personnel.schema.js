import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  patientName: { type: String, required: true }, // Patient's name instead of ID
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
  deliveryPersonnel: {
    name: { type: String, required: true }, // Delivery personnel's name
    contactInfo: { type: String, required: true }, // Contact info for delivery personnel
    otherDetails: { type: String }, // Optional details for delivery personnel
  },
  assignedDeliveries: [
    {
      deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery', required: true },
      assignedAt: { type: Date, default: Date.now }, // Tracks assignment time
    },
  ], // Array to track assigned deliveries
  status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
  deliveryTime: { type: Date },
  notes: { type: String },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export {
  Delivery

} 
