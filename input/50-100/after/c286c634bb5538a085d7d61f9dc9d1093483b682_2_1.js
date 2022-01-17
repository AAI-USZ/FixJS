function() {
        var leapSeconds = LeapSecond.leapSeconds;
        var toFind = new LeapSecond(new JulianDate(2441683, 43212.0, TimeStandard.TAI), 12.0);
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        expect(LeapSecond.leapSeconds[index].offset).toEqual(12.0);
    }