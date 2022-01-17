function() {
        var m = new Matrix2(1);
        expect(m.getColumn0Row0()).toEqual(1);
        expect(m.getColumn0Row1()).toEqual(0);
        expect(m.getColumn1Row0()).toEqual(0);
        expect(m.getColumn1Row1()).toEqual(1);
    }