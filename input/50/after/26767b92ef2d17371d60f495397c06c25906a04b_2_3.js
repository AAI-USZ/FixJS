function() {
        expect(function() {
            Matrix2.fromRowMajorArray({});
        }).toThrow();
    }