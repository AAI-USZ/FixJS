function (req, res) {
                res.writeHead(200, {
                    "Cache-Control": "max-age=0",
                    "Content-Type": "text/html"
                });
                res.end(doc);
            }