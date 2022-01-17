function() {
        expect(new Cartographic3(0, 2, 1).equalsEpsilon(new Cartographic3(0, 2, 1), 0)).toEqual(true);
        expect(new Cartographic3(0, 2, 1).equalsEpsilon(new Cartographic3(0, 2, 2), 1)).toEqual(true);
        expect(new Cartographic3(0, 2, 1).equalsEpsilon(new Cartographic3(0, 2, 3), 1)).toEqual(false);
    }