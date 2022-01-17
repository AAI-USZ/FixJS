function() {
        var cartesian = new Cartesian2(2.0, 0.0).normalize();
        expect(cartesian.x).toEqual(1.0);
        expect(cartesian.y).toEqual(0.0);
    }