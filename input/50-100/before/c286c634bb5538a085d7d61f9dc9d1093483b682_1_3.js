function() {
        var original = new JulianDate();
        var clone = JulianDate.fromDate(original.toDate());
        clone = clone.addSeconds(0.01);
        expect(original.equalsEpsilon(clone, CesiumMath.EPSILON1)).toEqual(true);
    }