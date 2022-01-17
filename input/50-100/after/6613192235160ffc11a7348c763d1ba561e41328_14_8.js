function() {
        var cartesian = new Cartesian4(2.0, 1.0, 0.0, 4.0);
        expect(cartesian.getMinimumComponent()).toEqual(cartesian.z);
    }