function() {
        var matrix = Matrix2.fromComponents(1, 2, 3, 4);
        var expected = Matrix2.fromComponents(1, 3, 2, 4);
        var result = matrix.transpose();
        expect(result).toEqual(expected);
    }