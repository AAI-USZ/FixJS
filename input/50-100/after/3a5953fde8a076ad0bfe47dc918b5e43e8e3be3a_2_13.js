function() {
        var matrix = new Matrix2(1, 2, 3, 4);
        var expected = new Matrix2(-1, -2, -3, -4);
        var result = matrix.negate();
        expect(result).toEqual(expected);
    }