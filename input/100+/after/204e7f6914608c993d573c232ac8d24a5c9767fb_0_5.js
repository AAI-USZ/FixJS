function(_args) {
        var _ = this._ = {};
        
        _.bpm     = 120; // (1 .. 511)
        _.samples = Infinity;
        _.keyons  = [];
        _.keyons.samples = 0;
        _.tie = false;
        
        var tracks = {};
        if (typeof _args[0] === "object") {
            var mmls = _args[0];
            for (var key in mmls) {
                tracks[key] = new MMLTrack(this, mmls[key]);
            }
        } else {
            for (var i = 0, imax = _args.length; i < imax; ++i) {
                tracks[i] = new MMLTrack(this, _args[i]);
            }
        }
        
        _.tracks       = tracks;
        _.selected     = 0;
        _.endedEvent  = false;
        
        if (tracks[_.selected]) {
            _.samples = 0;
        }
        
        this.onmml = onmml;
    }