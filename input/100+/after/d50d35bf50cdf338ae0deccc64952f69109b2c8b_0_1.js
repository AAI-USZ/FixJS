function(freq, opts) {
            var synth;
            if (opts.tnum === 60) {
                synth = T("*", T("pink", 0.2),
                               T("perc", "24db", 25));
            } else if (opts.tnum === 64) {
                synth =  T("*", T("fnoise", 250, 0.8),
                                T("perc", "24db", 150));
            }
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            return synth;
        }