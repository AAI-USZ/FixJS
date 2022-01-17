function(res) {
            var body = "";

            if (res.statusCode !== 200) {
                callback(new RelMe.HTTPError("Bad response code: " + res.statusCode), null);
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
        }