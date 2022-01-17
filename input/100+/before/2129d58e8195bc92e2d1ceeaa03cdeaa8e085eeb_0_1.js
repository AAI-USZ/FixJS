function get_img(that, env, def) {
    var src = that.attr('src');
    if (!src) {
        return undefined;
    }
    var isrc = src;
    if (src.length > 35) {
        isrc = src.slice(0,32) + "...";
    }
    if (!that.attr('alt')) {
        env.log.warn("No alt text on image: '%s'", isrc);
    }

    if (!def) {
        def = $.Deferred();
    }
    var u = url.parse(src);

    switch (u.protocol) {
        case 'http:':
            env.log.trace("Getting image: '%s'", isrc);
            http.get(u, function(res) {
                new bstream().readStream(res, function(er, buf) {
                    if (er) {
                        env.error(def, er);
                    } else {
                        parse_buffer(def, buf, res.headers['content-type'], that, env, true);
                    }
                });
            }).on('error', function(er) {
                env.error(def, er);
            });
            break;
        case 'https:':
            env.log.trace("Getting image: '%s'", isrc);
            https.get(u, function(res) {
                new bstream().readStream(res, function(er, buf) {
                    if (er) {
                        env.error(def, er);
                    } else {
                        parse_buffer(def, buf, res.headers['content-type'], that, env, true);
                    }
                });
            }).on('error', function(er) {
                env.error(def, er);
            });
            break;
        case "file:":
            src = url.pathname;
            // fall through
        case undefined:
            src = path.resolve(path.dirname(env.path), src);
            path.exists(src, function(exists) {
                if (exists && that.attr('width') && that.attr('height')) {
                    def.resolve();
                    return;
                }
                var str = fs.createReadStream(src);
                new bstream().readStream(str, function(er, buf) {
                    if (er) {
                        // re-download the file if possible
                        if (!check_src_for_url(that, env, def)) {
                            env.error(def, er);
                        }
                    } else {
                        parse_buffer(def, buf, mime.lookup(src), that, env, false);
                    }
                });
            });
            break;
        case "data:":
            if (that.attr('width') && that.attr('height')) {
                def.resolve();
                return;
            }
            // data: that didn't have a height or width.  Re-parse the image.
            var m = src.match(/^data:([^;,]+)(;base64)?,(.*)/);
            if (!m) {
                env.error(def, "Invalid data URI: '%s'", isrc);
                return; // continue
            }
            var buf;
            switch (m[2]) {
                case ';base64':
                    buf = new Buffer(m[3], 'base64');
                    break;
                case undefined:
                    buf = new Buffer(decodeURI(m[3]));
                    break;
                default:
                    env.error(def, "Invalid data: URI encoding: ", m[2]);
                    return; // continue
            }
            parse_buffer(def, buf, m[1], that, env, false);
            break;
        default:
            env.error(er, "Unknown image source URI scheme: ", u.protocol);
            break;
    }

    return def.promise();
}