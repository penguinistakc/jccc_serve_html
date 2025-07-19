"use strict";

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const sendErrorResponse = res => {
    res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

const app = http.createServer();

app.on("request", (req, res) => {
    let url = req.url;
    if (url.indexOf(".html") !== -1) {
        customReadFile(`./views${url}`, "text/html", res);
    } else if (url.indexOf(".js") !== -1) {
        customReadFile(`./public/js${url}`, "text/javascript", res);
    } else if (url.indexOf(".css") !== -1) {
        customReadFile(`./public/css${url}`, "text/css", res);
    } else if (url.indexOf(".png") !== -1) {
        customReadFile(`./public/images${url}`, "image/png", res);
    } else {
        sendErrorResponse(res);
}
})
.listen(3000);

console.log(`The server is listening on port number: ${port}`);

const customReadFile = (file_path, content_type, res) => {
    if (fs.existsSync(file_path)) {
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            } else {
                res.writeHead(httpStatus.StatusCodes.OK, {
                "Content-Type": content_type
            });
            }
        res.write(data);
        res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};
