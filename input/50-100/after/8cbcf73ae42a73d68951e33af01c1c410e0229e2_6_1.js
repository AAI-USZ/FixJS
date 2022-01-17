function() {
        var cartesian = new Cartesian2(1, 2);
        var result = new Cartesian2();
        var returnedResult = cartesian.clone(result);
        expect(cartesian === result).toEqual(false);
        expect(result === returnedResult).toEqual(true);
        expect(cartesian).toEqual(result);
    }