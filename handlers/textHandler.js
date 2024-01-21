const fs = require("fs");

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
module.exports = sendTextFile;
