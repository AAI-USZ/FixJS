function() {
        var start = JulianDate.fromTotalDays(12);
        var stop = JulianDate.fromTotalDays(112);
        var currentTime = JulianDate.fromTotalDays(13);
        var step = ClockStep.TICK_DEPENDENT;
        var range = ClockRange.LOOP;
        var multiplier = 1.5;
        var clock = new Clock({
            currentTime : currentTime,
            clockStep : step,
            multiplier : multiplier,
            startTime : start,
            stopTime : stop,
            clockRange : range
        });
        expect(clock.startTime).toEqual(start);
        expect(clock.stopTime).toEqual(stop);
        expect(clock.currentTime).toEqual(currentTime);
        expect(clock.clockStep).toEqual(step);
        expect(clock.clockRange).toEqual(range);
        expect(clock.multiplier).toEqual(multiplier);
    }