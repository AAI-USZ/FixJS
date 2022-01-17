function ParallelArray () {
        var i, j;
        var args;
        var result = this;

        for (i=0;i<fingerprintTracker.length;i++) {
            if (fingerprint === fingerprintTracker[i]) {
                console.log ("(fingerprint === fingerprintTracker)");
            }
        }

        if (arguments.length == 0) {
            result = createEmptyParallelArray.call(this);
        } else if (arguments.length == 1) {     
            result = createSimpleParallelArray.call(this, arguments[0]);
        } else if ((arguments.length == 2) && (typeof(arguments[0]) == 'function')) {
            // Special case where we force the type of the result. Should only be used internally
            result = createSimpleParallelArray.call(this, arguments[1], arguments[0]);
        } else if (useFF4Interface && (arguments[0] instanceof Components.interfaces.dpoIData)) {
            result = createOpenCLMemParallelArray.apply(this, arguments);
        } else if (typeof(arguments[1]) === 'function') {    
            var extraArgs;
            if (arguments.length > 2) {
                extraArgs = new Array(arguments.length -2); // skip the size vector and the function
                for (i=2;i<arguments.length; i++) {
                    extraArgs[i-2] = arguments[i];
                }
            } else {
                // No extra args.
                extraArgs = new Array(0);
            }
            result = createComprehensionParallelArray.call(this, arguments[0], arguments[1], extraArgs);
        } else {
            // arguments.slice doesn't work since arguments is not really an array so use this approach. 
            var argsAsArray = Array.prototype.slice.call(arguments);
            result = createSimpleParallelArray.call(this, argsAsArray);
        }
    
        for (i=0;i<fingerprintTracker.length;i++) {
            if (fingerprint === fingerprintTracker[i]) {
                console.log ("(fingerprint === fingerprintTracker)");
            }
        }
        result.uniqueFingerprint = fingerprint++;
        
        // use fast code for get if possible
        if (result.flat && result.shape && result.shape.length < 4) {
            result = new _fastClasses[result.shape.length](result);
        }
    
        if (enableProxies) {
            try { // for Chrome/Safari compatability
                result = Proxy.create(makeIndexOpHandler(result), ParallelArray.prototype);
            } catch (ignore) {}
        }

        return result;
    }