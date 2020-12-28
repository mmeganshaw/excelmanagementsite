const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));

require("./routes/index.js")(app);

app.listen(PORT, function(){ 
    console.log("listening on port " + PORT);
})