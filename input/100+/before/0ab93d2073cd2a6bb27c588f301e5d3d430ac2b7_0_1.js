function(req, res, next) {
        var acceptEncoding = req.headers['accept-encoding'] || '',
            url,
            filename,
            contentType,
            charset,
            method;


        function pass(name) {
            var urlReq = parseUrl(req).pathname;
            send(req, urlReq)
                .maxage(clientMaxAge || 0)
                .root(dirPath)
                .pipe(res)
                ;
        }

        function setHeaders(stat, asset) {
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Encoding', method);
            res.setHeader('Vary', 'Accept-Encoding');
            // if cache version is avalible then add this.
            if (asset) {
                // res.setHeader('Content-Length', asset.length);
                res.setHeader('ETag', '"' + asset.length + '-' + Number(asset.mtime) + '"');
                res.setHeader('Last-Modified', asset.mtime.toUTCString());
            }
            res.setHeader('Date', new Date().toUTCString());
            res.setHeader('Expires', new Date(Date.now() + clientMaxAge).toUTCString());
            res.setHeader('Cache-Control', 'public, max-age=' + (clientMaxAge / 1000));
        }

        // function gzipAndSend(filename, gzipName, mtime) {
        //     gzippo(filename, charset, function(gzippedData) {
        //         gzippoCache[gzipName] = {
        //             'ctime': Date.now(),
        //             'mtime': mtime,
        //             'content': gzippedData
        //         };
        //         sendGzipped(gzippoCache[gzipName]);
        //     });
        // }

        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }

        url = parse(req.url);

        // Allow a url path prefix
        if (url.pathname.substring(0, prefix.length) !== prefix) {
            return next();
        }

        filename = path.join(dirPath, url.pathname.substring(prefix.length));

        contentType = mime.lookup(filename);
        charset = mime.charsets.lookup(contentType, 'UTF-8');
        contentType = contentType + (charset ? '; charset=' + charset : '');

        // default to gzip
        if ('*' == acceptEncoding.trim()) method = 'gzip';

        // compression method
        if (!method) {
            for (var i = 0, len = names.length; i < len; ++i) {
              if (~acceptEncoding.indexOf(names[i])) {
                method = names[i];
                break;
              }
            }
        }

        if (!method) return pass(filename);

        fs.stat(decodeURI(filename), function(err, stat) {

            if (err || stat.isDirectory()) {
                return pass(req.url);
            }

            if (!contentTypeMatch.test(contentType)) {
                return pass(filename);
            }

            // superceeded by if (!method) return;
            // if (!~acceptEncoding.indexOf('gzip')) {
            //     return pass(filename);
            // }

            var base = path.basename(filename),
                dir = path.dirname(filename),
                gzipName = path.join(dir, base + '.gz');

            var sendGzipped = function(filename) {
                var stream = fs.createReadStream(filename);

                req.on('close', stream.destroy.bind(stream));

                var storeStream = new StoreStream(store, filename, {
                    mtime: stat.mtime,
                    maxAge: options.maxAge
                });

                var compressionStream = methods[method](options.compression);

                stream.pipe(compressionStream).pipe(storeStream).pipe(res);

                stream.on('error', function(err){
                    if (res.headerSent) {
                        console.error(err.stack);
                        req.destroy();
                    } else {
                        next(err);
                    }
                });
            };

            store.get(decodeURI(filename), function(err, asset) {
                setHeaders(stat, asset);
                if (err) {
                    // handle error

                } else if (!asset) {
                    sendGzipped(decodeURI(filename));
                } else if ((asset.mtime < stat.mtime) || asset.isExpired) {
                    sendGzipped(decodeURI(filename));
                }
                else if (req.headers['if-modified-since'] && asset &&
                // Optimisation: new Date().getTime is 90% faster that Date.parse()
                +stat.mtime <= new Date(req.headers['if-modified-since']).getTime()) {
                    removeContentHeaders(res);
                    res.statusCode = 304;
                    return res.end();
                }
                else {
                    // StoreReadStream to pipe to res.
                    // console.log("hit: " + filename + "              length: " + asset.length);
                    for (var i = 0; i < asset.content.length; i++) {
                        res.write(asset.content[i], 'binary');
                    }
                    res.end();
                }
            });
        });
    }