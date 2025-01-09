import mongoose from "mongoose";

const deliveryPersonnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  otherDetails: { type: String }, // Optional field for additional details
  assignedDeliveries: [
    {
      deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery', required: true },
      assignedAt: { type: Date, default: Date.now }, // Tracks assignment time
    },
  ], // Array to track assigned meal boxes (Delivery IDs)
});

module.exports = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);
