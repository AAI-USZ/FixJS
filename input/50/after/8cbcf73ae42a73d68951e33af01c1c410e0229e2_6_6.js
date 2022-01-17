function() {
        var cartesian = new Cartesian2(2, 3);
        expect(cartesian.magnitude()).toEqual(Math.sqrt(13));
    }