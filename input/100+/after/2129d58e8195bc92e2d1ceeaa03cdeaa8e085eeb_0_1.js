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

    resolver.get(src, path.dirname(env.path), function(er, res) {
        if (er) {
            if (res.protocol === 'file:') {
                // re-download
                if (!check_src_for_url(that, env, def)) {
                    env.error(def, er);
                }
            }
        } else {
            parse_buffer(def, res.buffer, res.contentType, that, env, res.remote);
        }
    });

    return def.promise();
}