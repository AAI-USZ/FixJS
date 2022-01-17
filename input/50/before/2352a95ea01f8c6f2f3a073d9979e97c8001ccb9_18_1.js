function() {
        expect(function() {
            Cartesian3.toString(undefined);
        }).toThrow();
    }