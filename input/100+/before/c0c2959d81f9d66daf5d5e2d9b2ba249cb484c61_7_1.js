function() {
        expect(new Cartesian3(1, 2, 1).equalsEpsilon(new Cartesian3(1, 2, 1), 0)).toEqual(true);
        expect(new Cartesian3(1, 2, 1).equalsEpsilon(new Cartesian3(1, 2, 2), 1)).toEqual(true);
        expect(new Cartesian3(1, 2, 1).equalsEpsilon(new Cartesian3(1, 2, 3), 1)).toEqual(false);
    }