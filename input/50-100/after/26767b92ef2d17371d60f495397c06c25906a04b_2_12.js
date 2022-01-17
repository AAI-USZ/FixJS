function() {
        var left = new Matrix2(1, 2, 3, 4);
        var right = 2;
        var expected = new Matrix2(2, 4, 6, 8);
        var result = new Matrix2();
        var returnedResult = left.multiplyByScalar(right, result);
        expect(returnedResult).toBe(result);
        expect(result).toEqual(expected);
    }