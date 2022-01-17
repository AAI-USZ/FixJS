function(res, cb) {

                var tz, links = [];

                if (res.statusCode !== 200) {
                    cb(new RelMe.HTTPError("Bad response code: " + res.statusCode), null);
                    return;
                }

                if (!res.headers['content-type'] || 
                    res.headers['content-type'].substr(0, 9) !== 'text/html') {
                    cb(new RelMe.TypeError(res.headers['content-type']), null);
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