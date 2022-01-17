function() {
        var values = [1, 2, 3,
                      4, 5, 6,
                      7, 8];

        expect(function() {
            return Matrix3.fromColumnMajorArray(values);
        }).toThrow();
    }