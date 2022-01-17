function localizeCartoURIs(s) {

            // Get all unique URIs in stylesheet
            var URIs = _.uniq(s.data.match(/url\((.*)\)/g) || []);

            // Update number of async calls so that we don't
            // call this() too soon (before everything is done)
            remaining += URIs.length;

            URIs.forEach(function(u) {
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
            });
        }