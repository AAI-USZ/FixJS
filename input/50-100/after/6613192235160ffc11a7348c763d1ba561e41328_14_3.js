function() {
        var cartesian = new Cartesian4(1.0, 2.0, 3.0, 4.0);
        var result = new Cartesian4();
        var returnedResult = cartesian.clone(result);
        expect(cartesian === result).toEqual(false);
        expect(result === returnedResult).toEqual(true);
        expect(cartesian).toEqual(result);
    }