function() {
        var start = JulianDate.fromTotalDays(0);
        var stop = JulianDate.fromTotalDays(1);
        var currentTime = JulianDate.fromTotalDays(0.5);
        var step = ClockStep.TICK_DEPENDENT;
        var range = ClockRange.LOOP;
        var multiplier = -1.5;
        var clock = new Clock({
            currentTime : currentTime,
            clockStep : step,
            multiplier : multiplier,
            startTime : start,
            stopTime : stop,
            clockRange : range
        });
        expect(currentTime.equals(clock.currentTime)).toEqual(true);

        currentTime = currentTime.addSeconds(multiplier);
        expect(currentTime.equals(clock.tick())).toEqual(true);
        expect(currentTime.equals(clock.currentTime)).toEqual(true);

        currentTime = currentTime.addSeconds(multiplier);
        expect(currentTime.equals(clock.tick())).toEqual(true);
        expect(currentTime.equals(clock.currentTime)).toEqual(true);
    }