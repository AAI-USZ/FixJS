function(successCallback, errorCallback, options) {
        if (arguments.length === 0) {
            throw new Error("getCurrentPosition must be called with at least one argument.");
        }
        options = parseParameters(options);

        // Timer var that will fire an error callback if no position is retrieved from native
        // before the "timeout" param provided expires
        var timeoutTimer = null;

        var win = function(p) {
            clearTimeout(timeoutTimer);
            if (!timeoutTimer) {
                // Timeout already happened, or native fired error callback for
                // this geo request.
                // Don't continue with success callback.
                return;
            }
            var pos = new Position(
                {
                    latitude:p.latitude,
                    longitude:p.longitude,
                    altitude:p.altitude,
                    accuracy:p.accuracy,
                    heading:p.heading,
                    velocity:p.velocity,
                    altitudeAccuracy:p.altitudeAccuracy
                },
                p.timestamp || new Date()
            );
            geolocation.lastPosition = pos;
            successCallback(pos);
        };
        var fail = function(e) {
            clearTimeout(timeoutTimer);
            timeoutTimer = null;
            var err = new PositionError(e.code, e.message);
            if (errorCallback) {
                errorCallback(err);
            }
        };

        // Check our cached position, if its timestamp difference with current time is less than the timeout, then just
        // fire the success callback with the cached position.
        if (geolocation.lastPosition && options.timeout && ((new Date()).getTime() - geolocation.lastPosition.timestamp.getTime() <= options.timeout)) {
            successCallback(cachedPosition);
        // If the cached position check failed and the timeout was set to 0, error out with a TIMEOUT error object.
        } else if (options.timeout === 0) {
            fail({
                code:PositionError.TIMEOUT,
                message:"timeout value in PositionOptions set to 0 and no cached Position object available, or cached Position object's age exceed's provided PositionOptions' maximumAge parameter."
            });
        // Otherwise we have to call into native to retrieve a position.
        } else {
            if (options.timeout !== Infinity) {
                // If the timeout value was not set to Infinity (default), then
                // set up a timeout function that will fire the error callback 
                // if no successful position was retrieved before timeout expired.
                timeoutTimer = setTimeout(function() {
                    clearTimeout(timeoutTimer);
                    timeoutTimer = null;
                    fail({
                        code:PositionError.TIMEOUT,
                        message:"Position retrieval timed out."
                    });
                }, options.timeout);
            } else {
                // This is here so the check in the win function doesn't mess stuff up
                // may seem weird but this guarantees timeoutTimer is 
                // always truthy before we call into native
                timeoutTimer = true; 
            }
            exec(win, fail, "Geolocation", "getLocation", [options.enableHighAccuracy, options.timeout, options.maximumAge]); 
        }
    }