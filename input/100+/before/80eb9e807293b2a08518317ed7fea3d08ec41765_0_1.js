function(x, callback) {
        if (!arguments.length) return urls;
        if (typeof reqwest === 'undefined') throw 'reqwest is required for url loading';
        if (typeof x === 'string') x = [x];

        urls = x;
        function add_features(x) {
            if (x && x.features) m.features(x.features);
            if (callback) callback(x.features, m);
        }

        reqwest((urls[0].match(/geojsonp$/)) ? {
            url: urls[0] + (~urls[0].indexOf('?') ? '&' : '?') + 'callback=grid',
            type: 'jsonp',
            jsonpCallback: 'callback',
            success: add_features,
            error: add_features
        } : {
            url: urls[0],
            type: 'json',
            success: add_features,
            error: add_features
        });
        return m;
    }