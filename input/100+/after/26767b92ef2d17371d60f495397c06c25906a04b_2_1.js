function() {
        var matrix = new Matrix2(1.0, 2.0, 3.0, 4.0);
        var expectedColumn0 = new Cartesian2(1.0, 3.0);
        var expectedColumn1 = new Cartesian2(2.0, 4.0);

        var resultColumn0 = matrix.getColumn(0);
        var resultColumn1 = matrix.getColumn(1);

        expect(resultColumn0).toEqual(expectedColumn0);
        expect(resultColumn1).toEqual(expectedColumn1);
    }