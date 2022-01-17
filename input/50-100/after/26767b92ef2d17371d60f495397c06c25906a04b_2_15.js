function() {
        var matrix = new Matrix2(1, 2, 3, 4);
        var expected = new Matrix2(-1, -2, -3, -4);
        var returnedResult = matrix.negate(matrix);
        expect(matrix).toBe(returnedResult);
        expect(matrix).toEqual(expected);
    }