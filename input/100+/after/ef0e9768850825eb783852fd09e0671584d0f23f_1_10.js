function() {
        var start = JulianDate.fromTotalDays(0);
        var stop = JulianDate.fromTotalDays(1);

        var currentTime = JulianDate.fromTotalDays(0);
        var step = ClockStep.TICK_DEPENDENT;
        var range = ClockRange.CLAMPED;
        var multiplier = -100.0;
        var clock = new Clock({
            currentTime : currentTime,
            clockStep : step,
            multiplier : multiplier,
            startTime : start,
            stopTime : stop,
            clockRange : range
        });

        expect(clock.currentTime).toEqual(currentTime);
        expect(start).toEqual(clock.tick());
        expect(start).toEqual(clock.currentTime);
    }