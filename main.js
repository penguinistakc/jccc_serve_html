"use strict"

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const getViewURL = (url) => {
    return `views${url}.html`
}

const app = http.createServer();

app.on("request", (req, res) => {
    let viewURL = getViewURL(req.url);
    fs.readFile(viewURL, (error, data) => {
        if (error) {
            res.writeHead(httpStatus.StatusCodes.NOT_FOUND);
            res.write("<h1>FILE NOT FOUND</h1>");
        } else {
            res.writeHead(httpStatus.StatusCodes.OK, {
                "Content-Type": "text/html"
            });
            res.write(data);
        }
        res.end();
    })
    }).listen(port);

console.log(`The server has started and is listening on port number: ${port}`)