function() {
        var left = new Matrix2(1, 2, 3, 4);
        var right = new Matrix2(5, 6, 7, 8);
        var expected = new Matrix2(19, 22, 43, 50);
        var returnedResult = left.multiply(right, left);
        expect(returnedResult).toBe(left);
        expect(left).toEqual(expected);
    }