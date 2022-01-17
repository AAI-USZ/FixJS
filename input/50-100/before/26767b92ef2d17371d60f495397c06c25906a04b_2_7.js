function() {
        var left = Matrix2.fromComponents(1, 2, 3, 4);
        var right = Matrix2.fromComponents(5, 6, 7, 8);
        var expected = Matrix2.fromComponents(19, 22, 43, 50);
        var result = new Matrix2();
        var returnedResult = left.multiply(right, result);
        expect(returnedResult).toBe(result);
        expect(result).toEqual(expected);
    }