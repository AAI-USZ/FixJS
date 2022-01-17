function() {
        var c = new Cartographic3(1, 2);
        expect(c.longitude).toEqual(1);
        expect(c.latitude).toEqual(2);
        expect(c.height).toEqual(0);
    }