function() {
        var matrix = new Matrix2();
        expect(matrix.values[0]).toEqual(0.0);
        expect(matrix.values[1]).toEqual(0.0);
        expect(matrix.values[2]).toEqual(0.0);
        expect(matrix.values[3]).toEqual(0.0);
        expect(matrix.values.length).toEqual(4);
    }