const fs = require("fs");

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
module.exports = sendPage;