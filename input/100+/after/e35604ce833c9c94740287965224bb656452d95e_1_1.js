function (ugenDef, parsedInputs, rates) {
        // Assume audio rate if no rate was specified by the user.
        if (!ugenDef.rate) {
            ugenDef.rate = flock.rates.AUDIO;
        }
    
        var buffer = new Float32Array(ugenDef.rate === flock.rates.AUDIO ? rates.control : 1),
            sampleRate;
    
        // Set the ugen's sample rate value according to the rate the user specified.
        if (ugenDef.options && ugenDef.options.sampleRate !== undefined) {
            sampleRate = ugenDef.options.sampleRate;
        } else if (ugenDef.rate === flock.rates.AUDIO) {
            sampleRate = rates.audio;
        } else if (ugenDef.rate === flock.rates.CONTROL) {
            sampleRate = rates.audio / rates.control;
        } else {
            sampleRate = 1;
        }
        
        ugenDef.options = ugenDef.options || {};
        ugenDef.options.sampleRate = sampleRate;
        ugenDef.options.rate = ugenDef.rate;
        
        return flock.invoke(ugenDef.ugen, [
            parsedInputs, 
            buffer, 
            ugenDef.options
        ]);
    }