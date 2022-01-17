function() {
        var m = new Matrix3(1, 2, 3,
                            4, 5, 6,
                            7, 8, 9);

        expect(m.getRow0().equals(new Cartesian3(1, 2, 3))).toEqual(true);
        expect(m.getRow1().equals(new Cartesian3(4, 5, 6))).toEqual(true);
        expect(m.getRow2().equals(new Cartesian3(7, 8, 9))).toEqual(true);
    }