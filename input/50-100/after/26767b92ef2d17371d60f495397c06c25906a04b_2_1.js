function() {
        var matrix = new Matrix2();
        expect(matrix[Matrix2.COLUMN0ROW0]).toEqual(0.0);
        expect(matrix[Matrix2.COLUMN1ROW0]).toEqual(0.0);
        expect(matrix[Matrix2.COLUMN0ROW1]).toEqual(0.0);
        expect(matrix[Matrix2.COLUMN1ROW1]).toEqual(0.0);
    }