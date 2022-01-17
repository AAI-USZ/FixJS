function() {
        var cartesian = new Cartesian4(1.0, 2.0, 3.0, 4.0);
        var result = cartesian.clone();
        expect(cartesian === result).toEqual(false);
        expect(cartesian).toEqual(result);
    }