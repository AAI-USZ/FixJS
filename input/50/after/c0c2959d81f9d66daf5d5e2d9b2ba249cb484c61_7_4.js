function() {
        var cartesian = new Cartesian3(1.0, 2.0, 3.0);
        expect(cartesian.getMinimumComponent()).toEqual(cartesian.x);
    }