function getlayers() {
        var l = [];
        for (var i in map.layers) {
            // TODO: make better indication of whether
            // this is an interactive layer
            if ((map.layers[i].visibility === true) &&
                (map.layers[i].CLASS_NAME === 'Map.Layer')) {
              l.push(map.layers[i]);
            }
        }
        return l;
    }