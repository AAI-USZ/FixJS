function() {
        var matrix = Matrix2.fromComponents(1, 2, 3, 4);
        var expected = Matrix2.fromComponents(-1, -2, -3, -4);
        var result = new Matrix2();
        var returnedResult = matrix.negate(result);
        expect(result).toBe(returnedResult);
        expect(result).toEqual(expected);
    }