function() {
        var matrix = new Matrix2(1.0, 2.0, 3.0, 4.0);
        expect(matrix[Matrix2.COLUMN0ROW0]).toEqual(1.0);
        expect(matrix[Matrix2.COLUMN1ROW0]).toEqual(2.0);
        expect(matrix[Matrix2.COLUMN0ROW1]).toEqual(3.0);
        expect(matrix[Matrix2.COLUMN1ROW1]).toEqual(4.0);
    }