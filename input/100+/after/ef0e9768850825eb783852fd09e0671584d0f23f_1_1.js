function() {
        var clock = new Clock();
        expect(clock.stopTime).toEqual(clock.startTime.addDays(1));
        expect(clock.startTime).toEqual(clock.currentTime.addDays(-0.5));
        expect(clock.clockStep).toEqual(ClockStep.SYSTEM_CLOCK_DEPENDENT);
        expect(clock.clockRange).toEqual(ClockRange.UNBOUNDED);
        expect(clock.multiplier).toEqual(1.0);
    }