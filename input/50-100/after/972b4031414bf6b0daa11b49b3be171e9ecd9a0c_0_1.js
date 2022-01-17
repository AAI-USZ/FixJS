function(err, data) {
                if (err)
                    return res.send(err, 500);
                cache.template = data;
                cache[req.headers.host] = data.replace(/\/\*\*HOST\*\*\//g, constructUrl(req));
                res.send(cache[req.headers.host], { 'content-type': 'text/javascript'});
            }