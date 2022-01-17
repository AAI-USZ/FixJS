function(options, data) {
        var clone = {};
        for (var key in data) {
            clone[key] = data[key];
        }
        if (options.format) {
            clone['__' + options.format + '__'] = true;
        }
        return html_sanitize(Mustache.to_html(x, clone), urlX, idX);
    }