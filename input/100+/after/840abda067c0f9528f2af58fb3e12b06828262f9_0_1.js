function(s, index) {
            if (typeof s !== 'string') {
                localizeCartoURIs(s);
                return next();
            }
            var uri = url.parse(s);

            // URL, download.
            if (uri.protocol && (uri.protocol == 'http:' || uri.protocol == 'https:')) {
                return (new get(s)).asBuffer(function(err, data) {
                    if (err) return next(err);

                    resolved.Stylesheet[index] = {
                        id: path.basename(uri.pathname),
                        data: data.toString()
                    };
                    next(err);
                    localizeCartoURIs(resolved.Stylesheet[index]);
                });
            }

            // File, read from disk.
            if (isRelative(uri.pathname)) {
                uri.pathname = path.join(base, uri.pathname);
            }
            fs.readFile(uri.pathname, 'utf8', function(err, data) {
                if (err) return next(err);

                resolved.Stylesheet[index] = {
                    id: s,
                    data: data
                };
                next(err);
                localizeCartoURIs(resolved.Stylesheet[index]);
            });
        }