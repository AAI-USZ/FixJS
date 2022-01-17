function grid() {
        var zoomLayer = map.getLayerAt(0)
            .levels[Math.round(map.getZoom())];
        if (!dirty && _grid !== undefined && _grid.length) {
            return _grid;
        } else {
            _grid = (function(t) {
                var o = [];
                for (var key in t) {
                    if (t[key].parentNode === zoomLayer) {
                        var offset = wax.u.offset(t[key]);
                        o.push([
                            offset.top,
                            offset.left,
                            t[key]
                        ]);
                    }
                }
                return o;
            })(map.getLayerAt(0).tiles);
            return _grid;
        }
    }