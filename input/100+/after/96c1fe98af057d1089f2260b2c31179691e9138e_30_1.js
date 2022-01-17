function addMeasurement(name) {
        if (!enabled) {
            return;
        }

        var elapsedTime = brackets.app.getElapsedMilliseconds();
        name = toMeasurementId(name);
        
        if (activeTests[name]) {
            elapsedTime -= activeTests[name].startTime;
            delete activeTests[name];
        }
        
        if (perfData[name]) {
            // We have existing data, add to it
            if (Array.isArray(perfData[name])) {
                perfData[name].push(elapsedTime);
            } else {
                // Current data is a number, convert to Array
                perfData[name] = [perfData[name], elapsedTime];
            }
        } else {
            perfData[name] = elapsedTime;
        }

        // Real time logging
        //console.log(name + " " + elapsedTime);
    }