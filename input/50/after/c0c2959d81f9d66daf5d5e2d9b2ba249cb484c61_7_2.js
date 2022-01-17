function() {
        var cartesian = new Cartesian3(2.0, 1.0, 0.0);
        expect(cartesian.getMaximumComponent()).toEqual(cartesian.x);
    }