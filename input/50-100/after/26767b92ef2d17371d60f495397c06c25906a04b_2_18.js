function() {
        var matrix = new Matrix2(1, 2, 3, 4);
        var expected = new Matrix2(1, 3, 2, 4);
        var returnedResult = matrix.transpose(matrix);
        expect(matrix).toBe(returnedResult);
        expect(matrix).toEqual(expected);
    }