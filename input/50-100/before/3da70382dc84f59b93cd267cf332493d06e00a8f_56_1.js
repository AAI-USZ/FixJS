function() {
        var c = CesiumMath.cartographic3ToRadians(new Cartographic3(360.0, 180.0, 1.0));
        expect(c.longitude).toEqual(2.0 * Math.PI);
        expect(c.latitude).toEqual(Math.PI);
        expect(c.height).toEqual(1.0);
    }