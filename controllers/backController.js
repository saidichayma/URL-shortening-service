const service = require("../services/backService");

exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!service.isUrl(longUrl)) return res.status(400).json({ message: "Invalid URL" });

        let url = await service.findUrl(longUrl);

        if (url) return res.status(208).json({ message: "URL already exists", url });

        const shortUrl = await service.createNewUrl(longUrl);

        res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving urls " + error });
    }
};
exports.getShortUrl = async (req, res) => {
    try {
        const url = await service.getShortUrl(req.params.id);
        if (!url) return res.status(404).json();
        return res.status(302).redirect(url.longUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json();
    }
};