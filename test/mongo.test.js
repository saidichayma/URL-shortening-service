const {expect} = require("expect");
const mongoose = require("mongoose");

test('Connection to Mongo', () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(
            "mongodb+srv://chaymasaidi15:fVZLaimW5WiaMKVl@cluster0.dxcfz.mongodb.net/urlDB?retryWrites=true&w=majority&appName=Cluster0",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 1000 * 60 * 15, // 15 min
            });
    expect(mongoose.connection.readyState).toBeTruthy();
});