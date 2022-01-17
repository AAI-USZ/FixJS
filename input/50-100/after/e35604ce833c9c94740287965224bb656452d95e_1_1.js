function (ugenDef, options) {
        // We didn't get an out ugen specified, so we need to make one.
        if (typeof (ugenDef.length) === "number" || (ugenDef.id !== flock.OUT_UGEN_ID && ugenDef.ugen !== "flock.ugen.out")) {
            ugenDef = {
                id: flock.OUT_UGEN_ID,
                ugen: "flock.ugen.out",
                inputs: {
                    sources: ugenDef,
                    bus: 0,
                    expand: options.chans
                }
            };
        }
        
        return flock.parse.ugenForDef(ugenDef, options.rates, options.visitors);
    }