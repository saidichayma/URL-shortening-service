const Urls = require("../models/urlModel");
const {nanoid} = require("nanoid");
const validUrl = require("valid-url");

exports.createNewUrl = async (longUrl) => {
    let code = this.generateId();
    let url = new Urls({ longUrl, shortUrl: code });
    await url.save();
    return code;
}
exports.getShortUrl = async (id) => await Urls.findOne({ shortUrl: id }).then(data => data);
exports.findUrl = async (longUrl) => await Urls.findOne({ longUrl });
exports.generateId = () => nanoid(6);
exports.isUrl = (url) => validUrl.isUri(url);