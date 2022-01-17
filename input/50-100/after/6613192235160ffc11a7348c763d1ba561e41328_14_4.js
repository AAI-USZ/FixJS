function() {
        var cartesian = new Cartesian4(1.0, 2.0, 3.0, 4.0);
        var returnedResult = cartesian.clone(cartesian);
        expect(cartesian === returnedResult).toEqual(true);
    }