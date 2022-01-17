function() {
        var ft = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77, 37.8]
            },
            "properties": {
                "title": "This is a bus",
                "marker-shape": "pin",
                "marker-size": "medium",
                "marker-symbol": "bus",
                "marker-color": "#1ae"
            }
        };
        var elem = simplestyle_factory(ft);
        expect(elem.src).toEqual('http://a.tiles.mapbox.com/v3/marker/pin-m-bus+1ae.png');
    }