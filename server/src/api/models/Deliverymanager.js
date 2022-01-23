const mongoose = require('mongoose');

const deliveryManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
}, { collection: "deliverymanagers" });


module.exports = mongoose.model('DeliveryManager', deliveryManagerSchema);