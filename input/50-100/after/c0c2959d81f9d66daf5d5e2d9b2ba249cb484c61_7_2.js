function() {
        var cartesian = new Cartesian3(3.0, 4.0, 5.0);
        expect(cartesian.magnitudeSquared()).toEqual(50.0);
    }