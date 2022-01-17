function() {
        var m = new Matrix3(1, 2, 3,
                            4, 5, 6,
                            7, 8, 9);

        expect(m.getColumn0().equals(new Cartesian3(1, 4, 7))).toEqual(true);
        expect(m.getColumn1().equals(new Cartesian3(2, 5, 8))).toEqual(true);
        expect(m.getColumn2().equals(new Cartesian3(3, 6, 9))).toEqual(true);
    }