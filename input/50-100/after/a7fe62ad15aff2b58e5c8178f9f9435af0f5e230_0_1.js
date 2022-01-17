function(err, tile, headers) {
                if (err){
                    console.log("[TILE RENDER ERROR]\n" + err);
                    res.send(err.message, 500); 
                } else {
                    app.sendWithHeaders(res, tile, 200, headers);
                }
            }