require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger , logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const User = require('./models/User');
const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const verificationRoute = require('./routes/verificationRoute');
const resetPasswordRoute = require('./routes/resetpwdRoute');
const phoneListingRoute = require('./routes/phoneListingRoute');
const searchRoute = require('./routes/searchRoute');
const userRoutes = require('./routes/userRoutes');
const commentRoute = require('./routes/commentRoute');
const transactionRoutes = require('./routes/checkoutRoute');

const PORT = process.env.PORT || 3500;

// console.log(process.env.NODE_ENV)   // development
connectDB();

app.use(logger)

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))


// define Routes
app.use('/api', signupRoute)
app.use('/api', verificationRoute)
app.use('/api', phoneListingRoute)
app.use('/api', searchRoute);
app.use('/api', resetPasswordRoute);
app.use('/api', signinRoute);
app.use('/api/user', userRoutes);
app.use('/api', commentRoute);
app.use('/api/transaction', transactionRoutes);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})