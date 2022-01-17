function() {
        var clock = new Clock();
        expect(clock.stopTime.equals(clock.startTime.addDays(1))).toEqual(true);
        expect(clock.startTime.equals(clock.currentTime.addDays(-0.5))).toEqual(true);
        expect(clock.clockStep).toEqual(ClockStep.SYSTEM_CLOCK_DEPENDENT);
        expect(clock.clockRange).toEqual(ClockRange.UNBOUNDED);
        expect(clock.multiplier).toEqual(1.0);
    }