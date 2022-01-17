function() {
        var left = new Matrix2(1, 2, 3, 4);
        var right = 2;
        var expected = new Matrix2(2, 4, 6, 8);
        var result = left.multiplyByScalar(right);
        expect(result).toEqual(expected);
    }