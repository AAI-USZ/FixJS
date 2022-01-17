function() {
        var matrix = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        var expectedColumn0 = new Cartesian2(1.0, 3.0);
        var expectedColumn1 = new Cartesian2(2.0, 4.0);

        var resultColumn0 = new Cartesian2();
        var resultColumn1 = new Cartesian2();
        var returnedResultColumn0 = matrix.getColumn(0, resultColumn0);
        var returnedResultColumn1 = matrix.getColumn(1, resultColumn1);

        expect(resultColumn0).toBe(returnedResultColumn0);
        expect(resultColumn0).toEqual(expectedColumn0);
        expect(resultColumn1).toBe(returnedResultColumn1);
        expect(resultColumn1).toEqual(expectedColumn1);
    }