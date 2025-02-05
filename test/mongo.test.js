const { expect } = require("expect"); 
const mongoose = require("mongoose"); 

test('Connection to Mongo', () => {
    // Enable strict query mode for Mongoose.
    mongoose.set('strictQuery', true);

    // Connect to the MongoDB database using Mongoose.
    mongoose.connect(
        "mongodb+srv://chaymasaidi15:fVZLaimW5WiaMKVl@cluster0.dxcfz.mongodb.net/urlDB?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            socketTimeoutMS: 1000 * 60 * 15, 
        }
    );

    // Check if the database connection is established.
    expect(mongoose.connection.readyState).toBeTruthy();
});
