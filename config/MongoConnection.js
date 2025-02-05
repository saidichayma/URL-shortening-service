const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

module.exports = mongoose
    .connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 1000 * 60 * 15, // 15 min
        }
    )
    .then(() => { console.log(`${new Date().toISOString()} [INFO] Connected to MongoDB`); })
    .catch((error) => { console.error(`${new Date().toISOString()} [ERROR] Error connecting to MongoDB ${error.message}` );});

