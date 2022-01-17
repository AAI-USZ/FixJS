function() {
        var cartesian = new Cartesian3(3.0, 4.0, 5.0);
        expect(cartesian.magnitude()).toEqual(Math.sqrt(50.0));
    }