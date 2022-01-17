function(dataByDate) {
        // Pivot data
        // (so that it's organized by step, then date; rather than date, step

        // Set up container object
        var dataByStep = {};
        var steps = data.newUserStepNames();
        steps.forEach(function(step) {
            dataByStep[step] = {};
        });

        dataByDate.forEach(function(datum) {
            var date = datum.key;

            steps.forEach(function(step) {
                var value;
                if(! (step in datum.value.steps)) { // No data about this step
                    // That means no one completed it.
                    value = 0;
                } else {
                    value = datum.value.steps[step];
                }

                dataByStep[step][date] = value;
            });
        });

        callback(dataByStep);
    }