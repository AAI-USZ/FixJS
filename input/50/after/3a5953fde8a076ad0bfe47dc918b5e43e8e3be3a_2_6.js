function() {
        expect(function() {
            Matrix2.toArray(undefined);
        }).toThrow();
    }