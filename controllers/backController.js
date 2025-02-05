const service = require("../services/backService"); 

exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body; 

        // Validate if the provided longUrl is a valid URL format.
        if (!service.isUrl(longUrl)) 
            return res.status(400).json({ message: "Invalid URL" });

        // Check if the URL already exists in the database.
        let url = await service.findUrl(longUrl);

        // If the URL exists, return a 208 (Already Reported) response with the existing URL.
        if (url) 
            return res.status(208).json({ message: "URL already exists", url });

        // If the URL doesn't exist, create a new short URL.
        const shortUrl = await service.createNewUrl(longUrl);

      
        res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });

    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error saving URLs " + error }); 
    }
};

exports.getShortUrl = async (req, res) => {
    try {
     
        const url = await service.getShortUrl(req.params.id);

        // If the short URL is not found, return a 404 (Not Found) response.
        if (!url) return res.status(404).json();

        // Redirect the user to the original long URL with a 302 (Found) status.
        return res.status(302).redirect(url.longUrl);
    } catch (error) {
        console.error(error); 
        return res.status(500).json(); 
    }
};
