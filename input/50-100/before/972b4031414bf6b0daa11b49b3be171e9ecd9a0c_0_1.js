function(err, data) {
                if (err) 
                    return res.send(err, 500);
                cache.template = data;
                cache[req.headers.host] = data.replace(/\/\*\*HOST\*\*\//g, req.headers.host);
                res.send(cache[req.headers.host], { 'content-type': 'text/javascript'});
            }