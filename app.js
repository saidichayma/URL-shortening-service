// Mongo Connection
require("./config/MongoConnection")
// Server HTTP Config
const app = require("./config/Express")
// Route Config
const Routes = require('./routes/backRoutes');
app.use('/',Routes); 

module.exports = app;