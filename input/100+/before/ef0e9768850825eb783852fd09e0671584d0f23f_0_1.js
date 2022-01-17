function(template) {
        var t = template;
        if (typeof t === 'undefined') {
            t = {};
        }

        var startTime = t.startTime;
        var startTimeUndefined = typeof startTime === 'undefined';

        var stopTime = t.stopTime;
        var stopTimeUndefined = typeof stopTime === 'undefined';

        var currentTime = t.currentTime;
        var currentTimeUndefined = typeof currentTime === 'undefined';

        if (startTimeUndefined && stopTimeUndefined && currentTimeUndefined) {
            currentTime = new JulianDate();
            startTime = currentTime.addDays(-0.5);
            stopTime = currentTime.addDays(0.5);
        } else if (startTimeUndefined && stopTimeUndefined) {
            startTime = currentTime.addDays(-0.5);
            stopTime = currentTime.addDays(0.5);
        } else if (startTimeUndefined && currentTimeUndefined) {
            startTime = stopTime.addDays(-1.0);
            currentTime = stopTime.addDays(0.5);
        } else if (currentTimeUndefined && stopTimeUndefined) {
            currentTime = startTime.addDays(0.5);
            stopTime = startTime.addDays(1.0);
        } else if (currentTimeUndefined) {
            currentTime = startTime.addSeconds(startTime.secondsDifference(stopTime));
        } else if (stopTimeUndefined) {
            stopTime = currentTime.addDays(0.5);
        } else if (startTimeUndefined) {
            startTime = currentTime.addDays(-0.5);
        }

        if (startTime.greaterThan(stopTime)) {
            throw new DeveloperError('startTime must come before stopTime.');
        }

        var multiplier = t.multiplier;
        if (typeof multiplier === 'undefined') {
            multiplier = 1.0;
        }

        var clockStep = t.clockStep;
        if (typeof clockStep === 'undefined') {
            clockStep = ClockStep.SYSTEM_CLOCK_DEPENDENT;
        }

        var clockRange = t.clockRange;
        if (typeof clockRange === 'undefined') {
            clockRange = ClockRange.UNBOUNDED;
        }

        /**
         * The start time of the clock.
         * @type JulianDate
         */
        this.startTime = startTime;

        /**
         * The stop time of the clock.
         * @type JulianDate
         */
        this.stopTime = stopTime;

        /**
         * The current time.
         * @type JulianDate
         */
        this.currentTime = currentTime;

        /**
         * Determines how much time advances when tick is called, negative values allow for advancing backwards.
         * If <code>clockStep</code> is set to ClockStep.TICK_DEPENDENT this is the number of seconds to advance.
         * If <code>clockStep</code> is set to ClockStep.SYSTEM_CLOCK_DEPENDENT this value is multiplied by the
         * elapsed system time since the last call to tick.
         * @type Number
         */
        this.multiplier = multiplier;

        /**
         * Determines if calls to <code>tick</code> are frame dependent or system clock dependent.
         * @type ClockStep
         */
        this.clockStep = clockStep;

        /**
         * Determines how tick should behave when <code>startTime</code> or <code>stopTime</code> is reached.
         * @type ClockRange
         */
        this.clockRange = clockRange;

        this._lastCpuTime = new Date().getTime();
    }