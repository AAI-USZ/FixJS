function() {
        var m = new Matrix3();
        var c0 = new Cartesian3(1, 2, 3);
        var c1 = new Cartesian3(4, 5, 6);
        var c2 = new Cartesian3(7, 8, 9);

        m.setColumn0(c0);
        m.setColumn1(c1);
        m.setColumn2(c2);

        expect(m.getColumn0().equals(c0)).toEqual(true);
        expect(m.getColumn1().equals(c1)).toEqual(true);
        expect(m.getColumn2().equals(c2)).toEqual(true);

        expect(m.equals(new Matrix3(1, 4, 7,
                                    2, 5, 8,
                                    3, 6, 9))).toEqual(true);
    }