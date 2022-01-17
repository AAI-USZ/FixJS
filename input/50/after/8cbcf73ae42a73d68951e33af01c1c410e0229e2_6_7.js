function() {
        var cartesian = new Cartesian2(2, 0).normalize();
        expect(cartesian.x).toEqual(1);
        expect(cartesian.y).toEqual(0);
    }