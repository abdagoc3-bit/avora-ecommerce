require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.json({ message: 'AVORA API server with MongoDB is running!' });
});

// AUTH ROUTES
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const newUser = new User({ fullname, email, password });
        await newUser.save();

        res.status(201).json({
            message: 'Account created successfully',
            user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = Buffer.from(`${user._id}:${user.email}`).toString('base64');

        res.status(200).json({
            message: 'Signed in successfully',
            token,
            user: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

// ORDER ROUTES
app.get('/api/orders', async (req, res) => {
    try {
        const filter = {};
        if (req.query.customerName) {
            filter.customerName = req.query.customerName;
        }
        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
});

app.get('/api/orders/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ data: order });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch order', error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, paymentMethod, items } = req.body;
        if (!customerName || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: 'customerName and non-empty items array are required.'
            });
        }

        const totalPrice = items.reduce(
            (sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 1)),
            0
        );

        const newOrder = new Order({
            orderId: 'AVR-' + Math.floor(100000 + Math.random() * 900000),
            customerName,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            status: 'Checked Out',
            items,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: 'Order saved to MongoDB successfully',
            data: savedOrder
        });
    } catch (err) {
        res.status(400).json({ message: 'Failed to create order', error: err.message });
    }
});

app.put('/api/orders/:orderId', async (req, res) => {
    try {
        const { paymentMethod, status } = req.body;
        const updates = {};
        if (paymentMethod) updates.paymentMethod = paymentMethod;
        if (status) updates.status = status;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({
            message: 'Order updated successfully',
            data: updatedOrder
        });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update order', error: err.message });
    }
});

app.delete('/api/orders/:orderId', async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({
            message: 'Order deleted successfully',
            data: deletedOrder
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete order', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});