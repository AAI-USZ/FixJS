function() {
        var cartesian = new Cartesian4(1.0, 2.0, 3.0, -1.0);
        expect(cartesian.getMaximumComponent()).toEqual(cartesian.z);
    }