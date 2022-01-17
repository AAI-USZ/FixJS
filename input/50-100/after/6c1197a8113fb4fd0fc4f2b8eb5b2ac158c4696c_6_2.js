function() {
        var expected = [1.0, 2.0, 3.0, 4.0];
        var matrix = new Matrix2(expected);
        expect(matrix.values).toBe(expected);
    }