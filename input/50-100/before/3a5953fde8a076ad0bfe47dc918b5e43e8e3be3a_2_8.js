function() {
        var left = Matrix2.fromComponents(1, 2, 3, 4);
        var right = Matrix2.fromComponents(5, 6, 7, 8);
        var expected = Matrix2.fromComponents(19, 22, 43, 50);
        var returnedResult = left.multiply(right, left);
        expect(returnedResult).toBe(left);
        expect(left).toEqual(expected);
    }