function() {
        var cartesian = new Cartesian2(1, 2);
        var result = cartesian.clone();
        expect(cartesian === result).toEqual(false);
        expect(cartesian).toEqual(result);
    }