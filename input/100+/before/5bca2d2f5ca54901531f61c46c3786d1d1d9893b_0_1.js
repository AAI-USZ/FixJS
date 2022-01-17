function (path, options) {
    var args = new(Args)(arguments);

    path = path.split('/');
    path = ['_design', path[0], '_view', path[1]].map(querystring.escape).join('/');

    if (options && typeof options === 'object') {
        ['key', 'startkey', 'endkey'].forEach(function (k) {
            if (k in options) { options[k] = JSON.stringify(options[k]) }
        });
    }

    if (options && options.keys) {
        return this.query({
            method: 'POST', 
            path: path, 
            query: options
          }, args.callback);
    } else {
        return this.query({
            method: 'GET', 
            path: path, 
            query: options
        }, args.callback);
    }
}