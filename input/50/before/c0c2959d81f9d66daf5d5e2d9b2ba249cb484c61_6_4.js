function() {
        expect(function() {
            Cartesian2.equalsEpsilon(new Cartesian2(), new Cartesian2(), undefined);
        }).toThrow();
    }