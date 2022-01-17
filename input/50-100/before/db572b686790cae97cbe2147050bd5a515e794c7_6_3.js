function() {
        var m = new Matrix2(1, 2,
                            3, 4);
        expect(m.getColumn0Row0()).toEqual(1);
        expect(m.getColumn0Row1()).toEqual(3);
        expect(m.getColumn1Row0()).toEqual(2);
        expect(m.getColumn1Row1()).toEqual(4);
    }