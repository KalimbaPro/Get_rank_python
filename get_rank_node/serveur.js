const fs = require("fs");
const http = require('http');
const config = require('./config.json');
const { Server: serverIo } = require('socket.io');

/**
 * @callback Request
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {URL} url
 *
 * @type {Map<String, Request>}
 */
var root = new Map()

root.set("/index.html", (req, res, url) => {
    const path = `./Public/${url.pathname}`

    if (req.method == "GET") {
        console.log(path)
        let file = fs.readFileSync(path, { encoding: 'utf-8' })

        res.setHeader(`Content-Type`, "text/html")
        res.end(file)
    } else {
        res.statusCode = 404
        res.end("404")
    }
});

root.set("/script.js", (req, res, url) => {
    const path = `./Public/${url.pathname}`

    if (req.method == "GET") {
        let file = fs.readFileSync(path, { encoding: 'utf-8' })

        res.setHeader(`Content-Type`, "application/javascript")
        res.end(file)
    } else {
        res.statusCode = 404
        res.end("404")
    }
});

root.set("/styles.css", (req, res, url) => {
    const path = `./Public/${url.pathname}`

    if (req.method == "GET") {
        let file = fs.readFileSync(path, { encoding: 'utf-8' })

        res.setHeader(`Content-Type`, "text/css")
        res.end(file)
    } else {
        res.statusCode = 404
        res.end("404")
    }
});

root.set("/OpenSans-VariableFont_wdth,wght.ttf", (req, res, url) => {
    const path = `./Public/${url.pathname}`

    if (req.method == "GET") {
        let file = fs.readFileSync(path);
        // res.setHeader(`Content-Type`, "font/ttf")
        res.end(file)
    } else {
        res.statusCode = 404
        res.end("404")
    }
});

function loadServer() {
    return http.createServer((req, res) => {
        if (req.url === `/`) {
            var url = new URL("/index.html", `http://${req.headers.host}`)
            root.get("/index.html") (req, res, url)
        } else {
            var url = new URL(req.url, `http://${req.headers.host}`)
            if (root.get(url.pathname)) {
                root.get(url.pathname) (req, res, url)
            } else {
                res.statusCode = 404
                res.end("404")
            }
        }
    });
};

const httpServer = loadServer()
const io = new serverIo(httpServer);

var socketGlobal = io.on("connection", (socket) => {
    console.log("a user connected", [ socket.id ], new Date())
    socket.on("profile", (data) => {
        socket.emit("profile", fs.readFileSync("./allProfile.json", { encoding: 'utf-8' }))
    });
    socket.on("disconnect", () => {
        console.log('user disconect', [ socket.id ], new Date())
    });
});

httpServer.listen(config.port, () => {
    console.log("http://localhost")
});