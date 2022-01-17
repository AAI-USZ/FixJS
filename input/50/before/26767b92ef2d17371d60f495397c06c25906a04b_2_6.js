function() {
        expect(function() {
            Matrix2.getColumn(undefined, 1);
        }).toThrow();
    }