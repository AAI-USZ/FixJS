function() {
        var expected = [1.0, 2.0, 3.0, 4.0];
        var matrix = new Matrix2(expected);
        expect(matrix[0]).toEqual(1.0);
        expect(matrix[1]).toEqual(2.0);
        expect(matrix[2]).toEqual(3.0);
        expect(matrix[3]).toEqual(4.0);
    }