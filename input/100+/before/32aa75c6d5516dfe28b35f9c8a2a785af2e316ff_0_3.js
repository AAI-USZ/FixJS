function(l, index) {
            if (!l.Datasource || !l.Datasource.file) return next();

            // TODO find  better home for this check.
            if (l.Datasource.ttl) checkTTL(cache, l);

            var name = l.name || 'layer-' + index,
                uri = url.parse(encodeURI(l.Datasource.file)),
                pathname = decodeURI(uri.pathname),
                extname = path.extname(pathname);

            // This function takes (egregious) advantage of scope;
            // l, extname, and more is all up-one-level.
            //
            // `file`: filename to be symlinked in place to l.Datasource.file
            var symlink = function(file, cb) {
                if (!file) return cb();

                switch (extname.toLowerCase()) {
                // Unzip and symlink to directory.
                case '.zip':
                    l.Datasource.file =
                        path.join(base,
                            'layers',
                            name,
                            path.basename(file, path.extname(file)) + '.shp');
                    path.exists(l.Datasource.file, function(exists) {
                        if (exists) return cb();
                        unzip(file, function(err, file) {
                            if (err) return cb(err);
                            utils.forcelink(path.dirname(file),
                                path.dirname(l.Datasource.file),
                                cb);
                        });
                    });
                    break;
                // Symlink directories
                case '.shp':
                    l.Datasource.file =
                        path.join(base, 'layers', name, path.basename(file));
                    utils.forcelink(
                        path.dirname(file),
                        path.dirname(l.Datasource.file), cb);
                    break;
                // Symlink files
                default:
                    l.Datasource.file =
                        path.join(base, 'layers', name + extname);
                    utils.forcelink( file,
                        l.Datasource.file,
                        cb);
                    break;
                }
            };

            // URL.
            if (uri.protocol && (uri.protocol == 'http:' || uri.protocol == 'https:')) {
                var filepath = path.join(cache, cachepath(l.Datasource.file));
                localize(uri.href, filepath, function(err, file) {
                    if (err) return next(err);
                    if (nosymlink) {
                        l.Datasource.file = file;
                        next();
                    } else {
                        symlink(file, next)
                    }
                });
            // Absolute path.
            } else if (pathname && pathname[0] === path_sep) {
                if (nosymlink) {
                    l.Datasource.file = pathname;
                    next();
                } else {
                    symlink(pathname, next);
                }
            // Local path.
            } else {
                l.Datasource.file = path.resolve(path.join(base, pathname));
                next();
            }
        }