function() {
        var master, t1, t2, t3;
        
        master = T("+");
        
        t1 = T("mml", "t160 o3 l4 $ a <c0e c0e> a <c0e c0e> g b0<d> b0<d> g b0<d> b0<d> g b0<d> b0<d> g+ b0<d> b0<d> a <c0e c0e> a <c0e c0e>");
        t1.synth = T("+").appendTo(master);
        t1.synthdef = function(freq, opts) {
            var synth = T("*", T("pulse", freq, 0.25),
                               T("adsr", "24db", 0, 500, 0.2, 250));
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            synth.keyoff = function(opts) {
                synth.args[1].keyoff();
            };
            return synth;
        };
        
        t2 = T("mml", "t160 o5 l8 k4 $ [ag+ab<cd e2de d2c4> b2. | ba+b<c>b<c dcdedc >b2<cd e2.>]2 <f4e4d4c4>b4<c4 >b2.a2r4")
        t2.synth = T("efx.reverb", 600, 0.8, 0.6).appendTo(master);
        t2.synthdef = function(freq, opts) {
            var synth = T("*", T("fami", freq),
                               T("adsr", "24db", 10, 2500));
            synth.keyon = function(opts) {
                synth.args[1].bang();
            };
            synth.keyoff = function(opts) {
                synth.args[1].keyoff();
            };
            return synth;
        };
        
        t3 = T("mml", "t160 l4 $ cee c16c16c8ee");
        t3.synth = T("rhpf", 2400, 0.8).appendTo(master);
        t3.synthdef = function(freq, opts) {
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
        };
        
        var buddies = [t1, t2, t3];
        master.buddy("play" , buddies, "on" );
        master.buddy("pause", buddies, "off");
        master.buddy("bang" , buddies);
        
        return master;
    }