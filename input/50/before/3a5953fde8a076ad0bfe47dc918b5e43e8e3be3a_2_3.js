function() {
        expect(function() {
            return new Matrix2({});
        }).toThrow();
    }