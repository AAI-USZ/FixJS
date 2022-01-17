function(s, index) {
            if (typeof s !== 'string') return next();
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
                });
            }

            // File, read from disk.
            if (uri.pathname[0] !== path_sep) {
                uri.pathname = path.join(base, uri.pathname);
            }
            fs.readFile(uri.pathname, 'utf8', function(err, data) {
                if (err) return next(err);

                resolved.Stylesheet[index] = {
                    id: s,
                    data: data
                };
                next(err);
            });
        }