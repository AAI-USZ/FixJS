function default405(req, res) {
        var body = "405'd";
        res.writeHead(404, { "Content-Length": body.length,
                             "Content-Type": "text/plain" });
        res.end(body);

        console.log("Someone 405'd -- url: " + req.url + "; verb: " + req.method);
    }