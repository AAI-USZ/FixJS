function() {
        var matrix = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
        var expectedColumn0 = new Cartesian3(1.0, 4.0, 7.0);
        var expectedColumn1 = new Cartesian3(2.0, 5.0, 8.0);
        var expectedColumn2 = new Cartesian3(3.0, 6.0, 9.0);

        var resultColumn0 = matrix.getColumn(0);
        var resultColumn1 = matrix.getColumn(1);
        var resultColumn2 = matrix.getColumn(2);

        expect(resultColumn0).toEqual(expectedColumn0);
        expect(resultColumn1).toEqual(expectedColumn1);
        expect(resultColumn2).toEqual(expectedColumn2);
    }