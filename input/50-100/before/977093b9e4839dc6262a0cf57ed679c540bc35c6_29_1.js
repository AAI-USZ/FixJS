function() {
        var c = new Cartographic3();
        expect(c.longitude).toEqual(0);
        expect(c.latitude).toEqual(0);
        expect(c.height).toEqual(0);
    }