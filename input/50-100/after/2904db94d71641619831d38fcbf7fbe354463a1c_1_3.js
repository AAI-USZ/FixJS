function() {
        var date = new JulianDate();
        var datePlusOne = date.addSeconds(0.01);
        expect(date.equalsEpsilon(datePlusOne, CesiumMath.EPSILON1)).toEqual(true);
    }