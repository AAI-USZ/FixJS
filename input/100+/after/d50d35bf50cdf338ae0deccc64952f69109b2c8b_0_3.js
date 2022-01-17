function(freq, opts) {
            var synth;
            if (opts.tnum === 60) {
                synth = T("*", T("pink", 0.4),
                               T("perc", "24db", 25));
            } else if (opts.tnum === 64) {
                synth =  T("*", T("fnoise", 440, 0.6),
                                T("perc", "24db", 200));
            }
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            return synth;
        }