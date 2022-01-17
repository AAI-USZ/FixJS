function() {
        var c = CesiumMath.cartographic2ToDegrees(new Cartographic2(Math.PI, 2.0 * Math.PI));
        expect(c.longitude).toEqual(180.0);
        expect(c.latitude).toEqual(360.0);
    }