function() {
        var matrix = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        var expectedRow0 = new Cartesian2(1.0, 2.0);
        var expectedRow1 = new Cartesian2(3.0, 4.0);

        var resultRow0 = new Cartesian2();
        var resultRow1 = new Cartesian2();
        var returnedResultRow0 = matrix.getRow(0, resultRow0);
        var returnedResultRow1 = matrix.getRow(1, resultRow1);

        expect(resultRow0).toBe(returnedResultRow0);
        expect(resultRow0).toEqual(expectedRow0);
        expect(resultRow1).toBe(returnedResultRow1);
        expect(resultRow1).toEqual(expectedRow1);
    }