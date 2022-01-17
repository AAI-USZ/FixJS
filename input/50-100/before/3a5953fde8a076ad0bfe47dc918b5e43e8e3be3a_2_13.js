function() {
        var matrix = Matrix2.fromComponents(1, 2, 3, 4);
        var expected = Matrix2.fromComponents(-1, -2, -3, -4);
        var result = matrix.negate();
        expect(result).toEqual(expected);
    }