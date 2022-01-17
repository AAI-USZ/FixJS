function() {
        expect(function() {
            Matrix4.fromRowMajorArray(undefined);
        }).toThrow();
    }