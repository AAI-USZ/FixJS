function() {
        var matrix = new Matrix2(1, 2, 3, 4);
        var expected = new Matrix2(1, 3, 2, 4);
        var result = new Matrix2();
        var returnedResult = matrix.transpose(result);
        expect(result).toBe(returnedResult);
        expect(result).toEqual(expected);
    }