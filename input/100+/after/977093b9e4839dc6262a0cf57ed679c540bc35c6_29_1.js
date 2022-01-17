function() {
        var cartographic = new Cartographic3(1.0, 2.0, 3.0);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 2.0, 3.0), 0.0)).toEqual(true);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 2.0, 3.0), 1.0)).toEqual(true);
        expect(cartographic.equalsEpsilon(new Cartographic3(2.0, 2.0, 3.0), 1.0)).toEqual(true);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 3.0, 3.0), 1.0)).toEqual(true);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 2.0, 4.0), 1.0)).toEqual(true);
        expect(cartographic.equalsEpsilon(new Cartographic3(2.0, 2.0, 3.0), 0.99999)).toEqual(false);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 3.0, 3.0), 0.99999)).toEqual(false);
        expect(cartographic.equalsEpsilon(new Cartographic3(1.0, 2.0, 4.0), 0.99999)).toEqual(false);
        expect(cartographic.equalsEpsilon(undefined, 1)).toEqual(false);
    }