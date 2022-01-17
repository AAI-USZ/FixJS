function() {
        var left = Matrix2.fromComponents(1, 2, 3, 4);
        var right = 2;
        var expected = Matrix2.fromComponents(2, 4, 6, 8);
        var result = new Matrix2();
        var returnedResult = left.multiplyByScalar(right, result);
        expect(returnedResult).toBe(result);
        expect(result).toEqual(expected);
    }