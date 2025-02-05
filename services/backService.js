const Urls = require("../models/urlModel"); 
const { nanoid } = require("nanoid"); 
const validUrl = require("valid-url"); 

exports.createNewUrl = async (longUrl) => {
    // Generate a unique short code using the generateId function
    let code = exports.generateId(); 

    // Create a new URL document with the original long URL and the generated short URL code
    let url = new Urls({ longUrl, shortUrl: code });

   
    await url.save();


    return code;
};

exports.getShortUrl = async (id) => 
    // Find a URL document in the database by its shortUrl field
    await Urls.findOne({ shortUrl: id }).then(data => data);

exports.findUrl = async (longUrl) => 
    // Find a URL document in the database by its longUrl field
    await Urls.findOne({ longUrl });

exports.generateId = () => 
    // Generate a random 6-character string using nanoid
    nanoid(6);

exports.isUrl = (url) => 
    // Check if the given string is a valid URL using valid-url package
    validUrl.isUri(url);
