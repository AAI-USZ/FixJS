function() {
        var matrix = Matrix2.fromComponents(1, 2, 3, 4);
        var expected = Matrix2.fromComponents(1, 3, 2, 4);
        var returnedResult = matrix.transpose(matrix);
        expect(matrix).toBe(returnedResult);
        expect(matrix).toEqual(expected);
    }