function() {
        var leapSeconds = LeapSecond.leapSeconds;
        var toFind = new LeapSecond(new JulianDate(2441317, 43210.0, TimeStandard.TAI), 0.0);
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        expect(leapSeconds[index].julianDate).toEqual(toFind.julianDate);
    }