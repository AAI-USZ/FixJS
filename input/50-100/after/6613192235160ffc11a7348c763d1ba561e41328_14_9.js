function() {
        var cartesian = new Cartesian4(3.0, 4.0, 5.0, 6.0);
        expect(cartesian.magnitude()).toEqual(Math.sqrt(86.0));
    }