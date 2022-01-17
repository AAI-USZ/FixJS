function() {
        expect(new Cartesian4(1, 2, 3, 4).mostOrthogonalAxis().equals(Cartesian4.UNIT_X)).toEqual(true);
        expect(new Cartesian4(4, 1, 2, 3).mostOrthogonalAxis().equals(Cartesian4.UNIT_Y)).toEqual(true);
        expect(new Cartesian4(3, 4, 1, 2).mostOrthogonalAxis().equals(Cartesian4.UNIT_Z)).toEqual(true);
        expect(new Cartesian4(2, 3, 4, 1).mostOrthogonalAxis().equals(Cartesian4.UNIT_W)).toEqual(true);
    }