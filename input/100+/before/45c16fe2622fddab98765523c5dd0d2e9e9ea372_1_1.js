function(dataByDate) {
        // Pivot data
        // (so that it's organized by step, then date; rather than date, step
        var dataByStep = {};

        dataByDate.forEach(function(datum) {
            var date = datum.key,
                steps = datum.value.steps;

            for(var step in steps) {
                if(steps.hasOwnProperty(step)) {
                    if(! (step in dataByStep)) {
                        dataByStep[step] = {};
                    }

                    dataByStep[step][date] = steps[step];
                }
            }
        });

        callback(dataByStep);
    }