//Import Libraries
require("dotenv").config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');

//Import Mail Transporter
const { initTransporter } = require('./config/mailer');

//Import Routes
const commonRoutes = require('./routes/common.route');
const authRoutes = require('./routes/auth.route');
const locationRoutes = require('./routes/location.route');
const categoryRoutes = require('./routes/category.route');
const subCategoryRoutes = require('./routes/sub-category.route');
const brandRoutes = require('./routes/brand.route');
const productRoutes = require('./routes/product.route');
const bundleRoutes = require('./routes/bundle.route');
const vendorRoutes = require('./routes/vendor.route');
const userRoutes = require('./routes/user.route');
const couponRoutes = require('./routes/coupon.route');
const orderRoutes = require('./routes/order.route');
const homeRoutes = require('./routes/home.route');
const cartRoutes = require('./routes/cart.route');
const addressRoutes = require('./routes/address.route');
const wishlistRoutes = require('./routes/wishlist.route');
const userCouponRoutes = require('./routes/user.coupon.route');
const userOrderRoutes = require('./routes/user.order.route');

//Get port
const portNode = process.env.PORT || 8080;

const app = express();

//Cors
app.use(cors())

//Parse Form Packet of data
app.use(bodyParser.urlencoded({ extended: true }));

//Parse json packet data
app.use(bodyParser.json());

//Init Mail Transporter
initTransporter();

//Route Middleware
app.use('/api/common', commonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/sub-category', subCategoryRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/product', productRoutes);
app.use('/api/bundle', bundleRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user/address', addressRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/user/coupon', userCouponRoutes);
app.use('/api/user/order', userOrderRoutes);

const { getTransporter } = require('./config/mailer');
app.get('/mail', function (req, res) {
    let result = getTransporter().sendMail({
        from: process.env.MAIL_FROM,
        to: 'vijendra3582@gmail.com',
        subject: 'New Mail',
        text: `New Mail`,
    }).then(([res]) => {
        console.log('Message delivered with code %s %s', res.statusCode, res.statusMessage);
    })
        .catch(err => {
            console.log('Errors occurred, failed to deliver message');

            if (err.response && err.response.body && err.response.body.errors) {
                err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
            } else {
                console.log(err);
            }
        });
})

app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res, next) => {
    return res.status(404).json({
        status: 0,
        message: "Page not found."
    });
});

app.listen(portNode, () => {
    console.log("Server is up and running on PORTs :", portNode);
});