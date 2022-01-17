function() {
        var master, t1, t2, t3;
        
        master = T("+");
        
        t1 = T("mml", "t120 o3 q2 $ f0a0<e4> f0a0<d4> f0a0<e8.> f0a0<d8.>f8 e0g0<d8>e0g0<d8> e0g0<c8>e8 e0g0<d8.> e0g0<c8.> e8");
        t1.synth = T("hpf", 1200).appendTo(master);
        t1.synthdef = function(freq, opts) {
            var synth = T("*", T("pulse", freq, 0.20),
                               T("adsr", "24db", 0, 500, 0.2, 500));
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            synth.keyoff = function(opts) {
                synth.args[1].keyoff();
            };
            return synth;
        };
        
        t2 = T("mml", "t120 o4 l8 $ o5 ab<c>a <e.e.r rdedcdc>b");
        t2.synth = T("+").appendTo(master).set({mul:1.0});
        t2.synthdef = function(freq, opts) {
            var synth =  T("*", T("+" , T("konami", freq, 0.25), T("konami", freq + 5, 0.1)),
                                T("perc", "24db", 250));
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            return synth;
        };
        t2.onexternal = function(opts) {
            t2.segno( (Math.random() * 6)|0 );
        };
        
        t3 = T("mml", "t120 $ c4e4c8c8e4 c4e4c8c8e4 c4e4c8c8e4 c4e4e8c8e8c16c16");
        t3.synth = T("efx.delay", 250, 0.75, T("rhpf", 2400, 0.8)).appendTo(master);
        t3.synthdef = function(freq, opts) {
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
        };
        
        master.buddy("play" , [t1, t2, t3], "on" );
        master.buddy("payse", [t1, t2, t3], "off");
        master.buddy("bang" , [t1, t2, t3]);
        
        return master;
    }