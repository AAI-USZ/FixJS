function() {
        var matrix = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);

        var expected = new Matrix3(10.0, 2.0, 3.0, 11.0, 5.0, 6.0, 12.0, 8.0, 9.0);
        var result = matrix.setColumn(0, new Cartesian3(10.0, 11.0, 12.0));
        expect(result).toEqual(expected);

        expected = new Matrix3(1.0, 13.0, 3.0, 4.0, 14.0, 6.0, 7.0, 15.0, 9.0);
        result = matrix.setColumn(1, new Cartesian3(13.0, 14.0, 15.0));
        expect(result).toEqual(expected);

        expected = new Matrix3(1.0, 2.0, 16.0, 4.0, 5.0, 17.0, 7.0, 8.0, 18.0);
        result = matrix.setColumn(2, new Cartesian3(16.0, 17.0, 18.0));
        expect(result).toEqual(expected);
    }