function() {
        var cartesian = new Cartesian3(1.0, 2.0, 3.0);
        var result = cartesian.clone();
        expect(cartesian === result).toEqual(false);
        expect(cartesian).toEqual(result);
    }