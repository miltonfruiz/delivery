const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: String,
  restaurantId: String,
  menuItemIds: [String],
  total: Number,
  status: String
});

module.exports = mongoose.model('Order', orderSchema);