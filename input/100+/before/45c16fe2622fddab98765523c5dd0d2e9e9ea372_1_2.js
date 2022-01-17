function(start, end, callback) {
    var dbOptions = {
        group: true
    };

    // Convert timestamps to dates
    if(start) {
        dbOptions.startkey = util.getDateStringFromUnixTime(start);
    }
    if(end) {
        dbOptions.endkey = util.getDateStringFromUnixTime(end);
    }

    db.view('new_user_time', dbOptions, function(dataByDate) {
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
    });
}