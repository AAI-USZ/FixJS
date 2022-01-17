function() {
        var matrix = Matrix2.fromComponents(1, 2, 3, 4);
        expect(matrix.toString()).toEqual('(1, 2)\n(3, 4)');
    }