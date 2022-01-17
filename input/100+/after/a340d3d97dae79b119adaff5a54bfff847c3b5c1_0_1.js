function(url, callback) {

        var parts = urlParse(url),
            options = {
                hostname: parts.hostname,
                port: parseInt(parts.port, 10) || ((parts.protocol == 'https:') ? 443: 80),
                path: parts.path,
                method: 'GET',
                headers: {
                    'User-Agent': 'OpenFollow/0.1.0 (http://openfollow.net/)',
                    'Connection': 'close'
                }
            },
            mod = (parts.protocol == 'http:') ? http : 
                (parts.protocol == 'https:') ? https :
                null;

        if (!mod) {
            callback(new RelMe.ProtocolError(parts.protocol), null);
            return;
        }

        // XXX: use a cache, you big jerk!

        mod.get(options, function(res) {
            var body = "";

            if (res.statusCode !== 200) {
                callback(new RelMe.HTTPError(res.statusCode), null);
                return;
            }

            if (!res.headers['content-type'] || 
                res.headers['content-type'].substr(0, 9) !== 'text/html') {
                callback(new RelMe.TypeError(res.headers['content-type']), null);
                return;
            }

            res.on("data", function(chunk) {
                body = body + chunk;
            });

            res.on("error", function(err) {
                callback(err, null);
            });

            res.on("close", function() {
                callback(new Error("Connection closed prematurely"), null);
            });

            res.on("end", function() {

                var tz, links = [];

                tz = new HTML5.Tokenizer(body);

                tz.on("token", function(tok) {
                    var href = null, isRelMe = false, i, attr;
                    switch (tok.type) {
                    case 'StartTag':
                        if (tok.name === 'a') {
                            for (i = 0; i < tok.data.length; i++) {
                                attr = tok.data[i];
                                if (attr.nodeName === 'href') {
                                    href = attr.nodeValue;
                                } else if (attr.nodeName === 'rel' && 
                                           attr.nodeValue === 'me') {
                                    isRelMe = true;
                                }
                            }
                            if (isRelMe && href) {
                                links.push(href);
                            }
                        }
                        break;
                    case 'EOF':
                        callback(null, links);
                        return;
                    }
                });

                tz.tokenize();
            });
        }).on('error', function(err) {
            console.log("Got to error");
            callback(err, null);
        });
    }