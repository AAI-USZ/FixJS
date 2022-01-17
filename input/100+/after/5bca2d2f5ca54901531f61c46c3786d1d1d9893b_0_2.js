function (path, options) {
    var args = new(Args)(arguments);
    path = path.split('/');

    if (typeof(options) === 'object') {
        ['key', 'keys', 'startkey', 'endkey'].forEach(function (k) {
            if (k in options) { options[k] = JSON.stringify(options[k]) }
        });
    }
    
    this.query({
      method: 'GET', 
      path: ['_design', path[0], '_list', path[1], path[2]].map(querystring.escape).join('/'), 
      query: options, 
    }, args.callback);
}