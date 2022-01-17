function(u) {
                var matched = u.match(/url\((["'])?(.*)\1\)/),
                    uri = url.parse(encodeURI(matched[2]));

                // URL.
                if (uri.protocol && (uri.protocol == 'http:' || uri.protocol == 'https:')) {
                    var filepath = path.join(cache, cachepath(matched[2]));
                    localize(uri.href, filepath, function(err, file) {
                        s.data = s.data.replace(matched[0], 'url(' + file + ')');
                        next(err);
                    });
                } else {
                    next(err);
                }
            }