function (args) {
        var light = args[0];
        var lightsource = args[1];
        node.setLight(light);
        defer.resolve(node);
    }