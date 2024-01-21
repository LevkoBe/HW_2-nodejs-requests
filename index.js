const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require('cors');

const endpointsInfo = require("./helpers/info.js");
const sendTextFile = require("./handlers/textHandler.js");
const getObjectFromURL = require("./handlers/objectHandler.js");
const sendPage = require("./handlers/pageHandler.js");

const app = express();
const ipAdress = "127.0.0.1";
const port = 3000;

const whitelist = ["http://127.0.0.1:3000", "http://127.0.0.1:4000", "http://127.0.0.1:5000"];
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};



app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    sendPage(req, res, "info");
});
app.get('/info', (req, res) => {
    res.json(endpointsInfo);
});
app.get('/story', (req, res) => {
    sendPage(req, res, "story");
});
app.get('/image', (req, res) => {
    const imagePath = `assets/images/image.png`;
    fs.readFile(imagePath, function(err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 Image Not Found");
        }

        res.writeHead(200, { "Content-Type": "image/png" });
        res.write(data);
        return res.end();
    });
});
app.get('/objects/', getObjectFromURL);
app.get('/objects/:character/', getObjectFromURL);
app.get('/objects/:character/:type', getObjectFromURL);
app.get('/file/:filename', sendTextFile);

app.listen(port, ipAdress, () => {
    console.log(`Server is running at 'http://${ipAdress}:${port}/`);
});
