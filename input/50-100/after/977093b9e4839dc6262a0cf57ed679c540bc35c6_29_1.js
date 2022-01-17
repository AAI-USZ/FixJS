function() {
        var c = new Cartographic3(1.0, 2.0, 3.0);
        expect(c.longitude).toEqual(1);
        expect(c.latitude).toEqual(2);
        expect(c.height).toEqual(3);
    }