function() {
        expect(function() {
            Cartesian2.dot(new Cartesian2(), undefined);
        }).toThrow();
    }