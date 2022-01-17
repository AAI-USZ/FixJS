function() {

                            var d = Q.defer(),
                                total = meta.length,
                                count = 0;

                            if (total === 0) d.resolve(true);

                            meta.forEach(function(path) {

                                FS.stat(PATH.resolve(_this.root, path), function(err, stat) {

                                    count++;

                                    if (err || stat.mtime.getTime() > nodeLastModified) d.resolve(false);
                                    if (count < total) return;
                                    d.resolve(true);

                                });

                            });

                            return d.promise;

                        }