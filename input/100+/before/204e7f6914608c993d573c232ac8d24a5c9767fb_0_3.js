function(_args) {
        var _ = this._ = {};
        
        _.bpm      = 120; // (1 .. 511)
        _.octave   = 5;   // (0 .. 9)
        _.length   = 4;   // (1 .. 1920)
        _.dot      = 0;   // (0 .. 3)
        _.detune   = 0;   // (-8192 .. 8191)
        _.quantize = 6;   // (0 .. 8)
        _.volume   = 8;   // (0 .. 128)
        _.keyons = [];
        _.keyons.samples = 0;
        
        var i = 0;
        if (typeof _args[i] === "string") {
            this.mml = _args[i++];
        } else {
            this.mml = "";
        }
        this.onmml = onmml;
    }