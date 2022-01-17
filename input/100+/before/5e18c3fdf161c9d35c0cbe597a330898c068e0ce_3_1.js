function() {

    it('has set a proper zoom level', function() {
        expect(map.getZoom()).toEqual(0);
    });

    it('can restrict its zoomlevel', function() {
        map.setZoomRange(5, 6);
        map.setZoom(7);
        expect(map.getZoom()).toEqual(6);
    });

    it('returns itself from chainable functions', function() {
        expect(map.setZoomRange(5, 6)).toEqual(map);
        expect(map.setZoom(7)).toEqual(map);
        expect(map.setCenter({ lat: 5, lon: 5 })).toEqual(map);
        expect(map.getZoom()).toEqual(6);
    });

  }