const mongoose = require('mongoose');

const Urls = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
   
},
    { collection: 'fullUrl' });

module.exports = mongoose.model('Urls', Urls);
