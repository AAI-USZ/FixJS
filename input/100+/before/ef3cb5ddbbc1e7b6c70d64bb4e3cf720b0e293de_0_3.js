function(opts) {
        var _ = this._
        var synth    = _.synth;
        var synthdef = _.synthdef;
        
        if (!synth || !synthdef) return;
        if (!synth.keyon) synth.keyon = {};
        
        if (opts.cmd === "keyon") {
            var x = synth.keyon[opts.tnum];
            if (x === undefined) {
                x = synthdef(opts.freq, opts);
                if (x === undefined) return;
                x.tnum = opts.tnum;
                synth.keyon[x.tnum] = x;
                synth.append(x);
            } else {
                x.removeFrom(synth).appendTo(synth); // LRU
            }
            if (x.keyon) x.keyon(opts);
            if (synth.args.length > 4) {
                delete synth.keyon[ synth.args.shift().tnum ];
            }
        } else if (opts.cmd === "keyoff") {
            var x = synth.keyon[opts.tnum];
            if (x !== undefined && x.keyoff) x.keyoff(opts);
        }
    }