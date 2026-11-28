const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    color: { type: String, default: 'Standard' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    status: { type: String, default: 'Checked Out' },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);