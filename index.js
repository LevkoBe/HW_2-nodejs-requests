const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require('cors');

const endpointsInfo = require("./helpers/info.js");
const animals = [...require("./data/positive.js"), ...require("./data/negative.js")];


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

function sendPage(req, res, pageName) {
    if (pageName === "info") {
        fs.readFile('assets/pages/index.html', function(err, data) {
            if (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end("404 Page Not Found");
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        })
    } else if (pageName === "story") {
        fs.readFile('assets/pages/story.html', function(err, data) {
            if (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end("404 Page Not Found");
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        })
    }
}
function sendTextFile(req, res) {
    fileName = req.params.filename;
    const filePath = `assets/files/${fileName}`;

    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 File Not Found");
        }

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(data);
        return res.end();
    });
}
function getObjectFromURL(req, res) {
    const { character, type } = req.params;
    if (!character) {
        res.json(animals);
    } else {
        if (!type) {
            const selected = animals.filter((animal) => animal.character === character);
            if (selected.length === 0) {
                res.status(404).json({ error: 'Objects not found' });
            } else {
                res.json(selected);
            }
        } else {
            const selected = animals.filter((animal) => animal.character === character && animal.animal === type);
            if (selected.length === 0) {
                res.status(404).json({ error: 'Objects not found' });
            } else {
                res.json(selected);
            }
        }
    }
}


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
