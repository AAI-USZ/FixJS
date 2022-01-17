function() {
        var cartesian = new Cartesian2(1.0, 2.0);
        expect(cartesian.equals(new Cartesian2(1.0, 2.0))).toEqual(true);
        expect(cartesian.equals(new Cartesian2(2.0, 2.0))).toEqual(false);
        expect(cartesian.equals(new Cartesian2(2.0, 1.0))).toEqual(false);
        expect(cartesian.equals(undefined)).toEqual(false);
    }