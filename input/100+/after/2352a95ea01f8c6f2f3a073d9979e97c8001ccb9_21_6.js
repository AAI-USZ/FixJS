function() {
        var matrix = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
        var expectedRow0 = new Cartesian3(1.0, 2.0, 3.0);
        var expectedRow1 = new Cartesian3(4.0, 5.0, 6.0);
        var expectedRow2 = new Cartesian3(7.0, 8.0, 9.0);

        var resultRow0 = matrix.getRow(0);
        var resultRow1 = matrix.getRow(1);
        var resultRow2 = matrix.getRow(2);

        expect(resultRow0).toEqual(expectedRow0);
        expect(resultRow1).toEqual(expectedRow1);
        expect(resultRow2).toEqual(expectedRow2);
    }