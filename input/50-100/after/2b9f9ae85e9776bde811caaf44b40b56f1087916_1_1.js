function (paths) {
    var togo = {};
    for (var i = 0; i < paths.length; ++ i) {
        var path = paths[i];
        var existing = fluid.get(togo, path, matchMaker.accessConfigs.get);
        if (!existing) {
            fluid.set(togo, path, {}, matchMaker.accessConfigs.set);
        }  
    };
    return togo;
}