function(url, callback) {
        var parts = urlParse(url);
        async.waterfall([
            function(cb) {
                var port = parseInt(parts.port, 10) || (parts.protocol === 'https:') ? 443: 80,
                    options = {
                        hostname: parts.hostname,
                        path: parts.path,
                        method: 'GET',
                        headers: {
                            'connection': 'close',
                            'user-agent': 'OpenFollow/0.1.0 (http://openfollow.net/)'
                        }
                    };

                // XXX: use a cache, you big jerk!
                http.get(options, function(res) {
                    cb(null, res);
                }).on('error', function(err) {
                    cb(err, null);
                });
            },
            function(res, cb) {

                var tz, links = [];

                if (res.statusCode !== 200) {
                    cb(new Error("Bad response code: " + res.statusCode), null);
                    return;
                }

                if (!res.headers['content-type'] || 
                    res.headers['content-type'].substr(0, 9) !== 'text/html') {
                    cb(new Error("Not HTML"), null);
                    return;
                }

                tz = new HTML5.Tokenizer(res);

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
                        cb(null, links);
                        return;
                    }
                });

                tz.tokenize();
            }
        ], callback);
    }