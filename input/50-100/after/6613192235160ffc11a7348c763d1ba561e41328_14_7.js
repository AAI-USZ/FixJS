function() {
        var cartesian = new Cartesian4(1.0, 2.0, 3.0, 4.0);
        expect(cartesian.getMinimumComponent()).toEqual(cartesian.x);
    }