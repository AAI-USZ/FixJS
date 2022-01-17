function grid() {
        if (!dirty && _grid !== undefined && _grid.length) {
            return _grid;
        } else {
            var tiles;
            for (var i = 0; i < map.getLayers().length; i++) {
                var levels = map.getLayerAt(i).levels;
                var zoomLayer = levels && levels[Math.round(map.zoom())];
                if (zoomLayer !== undefined) {
                    tiles = map.getLayerAt(i).tileElementsInLevel(zoomLayer);
                    if (tiles.length) break;
                }
            }
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
            })(tiles);
            return _grid;
        }
    }