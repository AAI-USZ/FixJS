function() {
        var start = JulianDate.fromTotalDays(0);
        var stop = JulianDate.fromTotalDays(1);
        var currentTime = JulianDate.fromTotalDays(0);
        var step = ClockStep.TICK_DEPENDENT;
        var range = ClockRange.UNBOUNDED;
        var multiplier = -1.5;
        var clock = new Clock({
            currentTime : currentTime,
            clockStep : step,
            multiplier : multiplier,
            startTime : start,
            stopTime : stop,
            clockRange : range
        });
        expect(clock.currentTime).toEqual(currentTime);

        currentTime = currentTime.addSeconds(multiplier);
        expect(currentTime).toEqual(clock.tick());
        expect(clock.currentTime).toEqual(currentTime);

        currentTime = currentTime.addSeconds(multiplier);
        expect(currentTime).toEqual(clock.tick());
        expect(clock.currentTime).toEqual(currentTime);
    }