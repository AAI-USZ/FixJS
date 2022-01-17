function (req, res) {
        if (!cache.template) {
            return fs.readFile(__dirname + '/browser_client_tmpl.js', 'utf-8', function(err, data) {
                if (err) 
                    return res.send(err, 500);
                cache.template = data;
                cache[req.headers.host] = data.replace(/\/\*\*HOST\*\*\//g, req.headers.host);
                res.send(cache[req.headers.host], { 'content-type': 'text/javascript'});
            });
        }

        if (!cache[req.headers.host]) {
            cache[req.headers.host] = cache.template.replace(/\/\*\*HOST\*\*\//g, req.headers.host);
        }

        res.send(cache[req.headers.host], { 'content-type': 'text/javascript'});
    }