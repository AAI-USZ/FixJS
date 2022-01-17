function(next) {
                        if (!dbs[i]) {
                            return next();
                        }

                        var file = url.parse(dbs[i].split('@').pop());
                        var pathname = file.pathname;
                        var extname = path.extname(pathname);
                        var alias = dbs[i].split('@').shift();
                        var name = (l.name || 'layer-' + index) + '-attach-' + alias;
                        var index = i;

                        var symlink = function(filepath, cb) {
                            var filename = path.join(base, 'layers', name + extname);
                            dbs[index] =  alias + '@' + filename;
                            utils.forcelink(filepath, filename, cb);
                        };

                        // URL.
                        if (file.protocol) {
                            var filepath = path.join(cache, cachepath(file.href));
                            localize(file.href, filepath, function(err) {
                                if (err) return next(err);
                                if (nosymlink) {
                                    dbs[index] = alias + '@' + filepath;
                                    next();
                                } else {
                                    symlink(filepath, next);
                                }
                            });
                        }
                        // Absolute path.
                        else if (!isRelative(pathname)) {
                            if (nosymlink) {
                                dbs[index] = alias + '@' + pathname;
                                next();
                            } else {
                                symlink(pathname, next);
                            }
                        }
                        // Local path.
                        else {
                            dbs[index] =  alias + '@' + path.join(base, pathname);
                            next();
                        }
                    }