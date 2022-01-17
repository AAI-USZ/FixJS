function() {
        var c = CesiumMath.cartographic2ToRadians(new Cartographic2(180.0, 360.0));
        expect(c.longitude).toEqual(Math.PI);
        expect(c.latitude).toEqual(2.0 * Math.PI);
    }