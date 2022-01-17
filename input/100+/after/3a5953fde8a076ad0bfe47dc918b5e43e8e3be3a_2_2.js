function() {
        var matrix = new Matrix2(1.0, 2.0, 3.0, 4.0);

        var expected = new Matrix2(5.0, 2.0, 6.0, 4.0);
        var result = matrix.setColumn(0, new Cartesian2(5.0, 6.0));
        expect(result).toEqual(expected);

        expected = new Matrix2(1.0, 7.0, 3.0, 8.0);
        result = matrix.setColumn(1, new Cartesian2(7.0, 8.0));
        expect(result).toEqual(expected);
    }