function() {
        var cartesian = new Cartesian2(2.0, 1.0);
        expect(cartesian.getMaximumComponent()).toEqual(cartesian.x);
    }