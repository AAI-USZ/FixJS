function(path, suffix, vars) {
    var bemhtmlFile = vars.Prefix + '.bemhtml.js',
        bemjsonFile = vars.Prefix + '.bemjson.js';

    return Q.all([
            readBemhtml(bemhtmlFile),
            readBemjson(bemjsonFile)
        ])
        .spread(function(bemhtml, bemjson) {
            return bemhtml.apply(bemjson);
        });
}