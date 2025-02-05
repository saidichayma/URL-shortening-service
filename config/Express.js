const express = require("express");
const cors = require("cors");

const port = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors(
        {
            origin: '*',
            credentials: true,
            optionSuccessStatus: 200,
        }
    )
);

app.listen(port, () => {
    console.log(`${new Date().toISOString()} [INFO] Server running on port: ${port}`)
});

module.exports = app;