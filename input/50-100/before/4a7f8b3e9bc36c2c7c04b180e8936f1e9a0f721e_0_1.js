function() {
        var ft = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77, 37.8]
            },
            "properties": {
                "title": "This is a bus"
            }
        };
        var elem = simplestyle_factory(ft);
        expect(jasmine.isDomNode(elem)).toBeTruthy();
    }