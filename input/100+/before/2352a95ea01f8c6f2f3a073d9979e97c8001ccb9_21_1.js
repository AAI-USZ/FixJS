function() {
        var m = new Matrix3();
        expect(m.getColumn0Row0()).toEqual(0);
        expect(m.getColumn0Row1()).toEqual(0);
        expect(m.getColumn0Row2()).toEqual(0);
        expect(m.getColumn1Row0()).toEqual(0);
        expect(m.getColumn1Row1()).toEqual(0);
        expect(m.getColumn1Row2()).toEqual(0);
        expect(m.getColumn2Row0()).toEqual(0);
        expect(m.getColumn2Row1()).toEqual(0);
        expect(m.getColumn2Row2()).toEqual(0);
    }