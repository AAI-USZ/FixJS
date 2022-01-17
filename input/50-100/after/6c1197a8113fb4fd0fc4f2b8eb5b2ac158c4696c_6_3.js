function() {
        var expected = new Matrix2([1.0, 2.0, 3.0, 4.0]);
        var result = new Matrix2();
        var matrix = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0, result);
        expect(matrix).toBe(result);
        expect(matrix).toEqual(expected);
    }