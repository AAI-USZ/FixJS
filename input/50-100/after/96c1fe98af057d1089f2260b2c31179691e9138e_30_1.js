function markStart(name) {
        if (!enabled) {
            return;
        }

        var time = brackets.app.getElapsedMilliseconds();
        name = toMeasurementId(name);

        // Array of names can be passed in to have multiple timers with same start time
        if (Array.isArray(name)) {
            var i;
            for (i = 0; i < name.length; i++) {
                _markStart(name[i], time);
            }
        } else {
            _markStart(name, time);
        }

        return name;
    }