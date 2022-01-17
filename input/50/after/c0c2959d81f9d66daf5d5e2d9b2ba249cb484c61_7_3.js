function() {
        var cartesian = new Cartesian3(1.0, 2.0, 0.0);
        expect(cartesian.getMaximumComponent()).toEqual(cartesian.y);
    }