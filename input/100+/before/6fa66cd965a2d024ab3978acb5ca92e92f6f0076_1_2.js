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
        expect(start.equals(clock.startTime)).toEqual(true);
        expect(stop.equals(clock.stopTime)).toEqual(true);
        expect(currentTime.equals(clock.currentTime)).toEqual(true);
        expect(clock.clockStep).toEqual(step);
        expect(clock.clockRange).toEqual(range);
        expect(clock.multiplier).toEqual(multiplier);
    }