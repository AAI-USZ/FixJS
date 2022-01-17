function() {
        var start = JulianDate.fromTotalDays(0);
        var stop = JulianDate.fromTotalDays(1);
        var currentTime = JulianDate.fromTotalDays(0);
        var step = ClockStep.SYSTEM_CLOCK_DEPENDENT;
        var range = ClockRange.UNBOUNDED;
        var multiplier = 10000;
        var clock = new Clock({
            currentTime : currentTime,
            clockStep : step,
            multiplier : multiplier,
            startTime : start,
            stopTime : stop,
            clockRange : range
        });

        expect(currentTime.equals(clock.currentTime)).toEqual(true);
        currentTime = currentTime.addSeconds(5);
        clock.tick(5);
        expect(currentTime.equals(clock.currentTime)).toEqual(true);
        clock.tick(-5);
        currentTime = currentTime.addSeconds(-5);
        expect(currentTime.equals(clock.currentTime)).toEqual(true);
    }