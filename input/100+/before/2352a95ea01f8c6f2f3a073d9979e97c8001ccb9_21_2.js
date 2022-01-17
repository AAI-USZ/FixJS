function() {
        var values = [1, 2, 3,
                      4, 5, 6,
                      7, 8, 9];

        var m = Matrix3.fromColumnMajorArray(values);
        expect(m.getColumn0Row0()).toEqual(1);
        expect(m.getColumn0Row1()).toEqual(2);
        expect(m.getColumn0Row2()).toEqual(3);
        expect(m.getColumn1Row0()).toEqual(4);
        expect(m.getColumn1Row1()).toEqual(5);
        expect(m.getColumn1Row2()).toEqual(6);
        expect(m.getColumn2Row0()).toEqual(7);
        expect(m.getColumn2Row1()).toEqual(8);
        expect(m.getColumn2Row2()).toEqual(9);
    }