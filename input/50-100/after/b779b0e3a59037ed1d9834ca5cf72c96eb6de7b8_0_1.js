function(err, tile, headers) {
                if (err){
                    console.log("[TILE RENDER ERROR]\n" + err);
                    res.send(err, 500);
                } else {
                    app.sendWithHeaders(res, tile, 200, headers);
                }
            }