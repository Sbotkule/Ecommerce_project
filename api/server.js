const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const genreRoutes = require('./routes/genreRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const imageRoutes = require('./routes/imageRoutes');
const miniImageRoutes = require('./routes/miniImageRoutes');

const app = express();
const port = process.env.PORT || 4000;

// Middleware to handle CORS preflight requests
app.options('*', cors());

// Middleware to enable CORS
app.use(cors());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// ROUTES
app.use('/user/users', userRoutes);
app.use('/user/categories', categoryRoutes);
app.use('/user/genres', genreRoutes);
app.use('/user/products', productRoutes);
app.use('/user/ratings', ratingRoutes);
app.use('/user/comments', commentRoutes);
app.use('/user/orders', orderRoutes);
app.use('/user/reports', reportRoutes);
app.use('/user/images', imageRoutes);
app.use('/user/minis', miniImageRoutes);

// STRIPE CONNECTION
app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(price),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/clothify', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Successfully connected to MongoDB.');

    // Check if admin user exists, if not, create one
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
        const hashedPassword = 'test@test.com'; // Replace with your hashed password
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            phone: '12345678900',
            password: hashedPassword,
            admin: true
        });
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }

    // Start the server after successfully connecting to MongoDB
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
