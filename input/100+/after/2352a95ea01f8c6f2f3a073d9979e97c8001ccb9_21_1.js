function() {
        var matrix = new Matrix3();
        expect(matrix[Matrix3.COLUMN0ROW0]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN1ROW0]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN2ROW0]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN0ROW1]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN1ROW1]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN2ROW1]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN0ROW2]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN1ROW2]).toEqual(0.0);
        expect(matrix[Matrix3.COLUMN2ROW2]).toEqual(0.0);
    }