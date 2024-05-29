const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/OldPhoneDeals';

const connectDB = async () => {
    try {
        await mongoose
        .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
        });
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI)
//     } catch (err) {
//         console.log(err);
//         process.exit(1)
//     }
// }

 module.exports = connectDB;