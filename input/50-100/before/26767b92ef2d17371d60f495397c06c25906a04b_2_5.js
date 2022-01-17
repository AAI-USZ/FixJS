function() {
        var matrix = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        var expectedRow0 = new Cartesian2(1.0, 2.0);
        var expectedRow1 = new Cartesian2(3.0, 4.0);

        var resultRow0 = matrix.getRow(0);
        var resultRow1 = matrix.getRow(1);

        expect(resultRow0).toEqual(expectedRow0);
        expect(resultRow1).toEqual(expectedRow1);
    }