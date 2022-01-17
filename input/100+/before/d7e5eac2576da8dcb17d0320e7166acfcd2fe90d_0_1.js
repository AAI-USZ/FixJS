function() {
    var Vocals, bass, bass_dac, buddies, chord, chord_dac, desc, drum, drum_dac, master, rnd_val, vocal, vocal_dac;
    Vocals = ["e8.d8.e8", "d4.>b16<c16", "d8.d8.e8 | $1 d8.d8.c8", "e4.e16e16 | $1 c2", "e4d4 | $1 e8e8e8f8", "c4.c16c16 | $1 e8c8c8e8", "d8.d8.c8 | $1 e8.d8.c8", "c4.c16d16 | $1 c2", "c8.c8.d8", "d2", "d8.d8.e8 | $1 >b8.b8.<c8", "e2 | $1 c2", "e8f8e8d8", "c4.e16c16", "d8.c8.c8", "c2", "c4e4", "d4a8g8", "g8d8d8e8", "e2 | $1 c2", "c8.d8.c8", "d8.c8.d8", "e8.d8.c8 | $1 >b8.<c8.d8", "c2", "r8e8e8e8", "e8c8c8e8", "e8d8d8c8", "d8e16e16&e4 | $1 c2", ">a4.<c8", ">a4.<c8", "d4.e8", "c2", "d8.d8.e8", "e2", "d8.d8.c8", "c2", ">a4<e4", "f4.e16c16", "d8.d8.e8 | $1 d8.d8.c8", "e2 | $1 c2"];
    Vocals.index = 0;
    vocal_dac = T("dac").set({
      pan: 0.6
    });
    vocal = T("mml", Vocals);
    vocal.synth = T("+").appendTo(vocal_dac);
    vocal.synthdef = function(freq, opts) {
      var synth;
      synth = T("*", T("osc", "konami(25)", freq * 2, 0.85), T("perc", "24db", 1500));
      synth.keyon = function(opts) {
        return synth.args[1].bang();
      };
      synth.keyoff = function(opts) {
        return synth.args[1].keyoff();
      };
      return synth;
    };
    vocal_dac.buddy("play", vocal, "on");
    vocal_dac.buddy("pause", vocal, "off");
    rnd_val = 0;
    vocal.onended = function() {
      if (Vocals.index % 4 === 0) {
        if (Math.random() < 0.5) {
          rnd_val = (Math.random() * (Vocals.length / 4) | 0) * 4;
        }
      } else {
        if (Math.random() < 0.25) {
          rnd_val = (Math.random() * (Vocals.length / 4) | 0) * 4;
        }
      }
      vocal.selected = rnd_val + Vocals.index % 4;
      vocal.bang();
      if (Vocals.index >= 4) {
        vocal.segno(1);
      } else {
        vocal.segno(0);
      }
      return Vocals.index = (Vocals.index + 1) % 8;
    };
    chord_dac = T("dac").set({
      pan: 0.3
    });
    chord = T("mml", "l8 q6 $ [e0<c.>e0<c.>e0<c> rf0<d.>f0<d.>  g0b.g0b.g0b | <c0e4 >b0<d4>]2 < rg0<c.>g0<c.>> ");
    chord.synth = T("efx.delay").appendTo(chord_dac);
    chord.synthdef = function(freq, opts) {
      var synth;
      synth = T("*", T("+", T("osc", "saw(40)", freq - 2, 0.4), T("osc", "saw(40)", freq + 2, 0.4)), T("adsr", "24db", 0, 800, 0.8, 50));
      synth.keyon = function(opts) {
        return synth.args[1].bang();
      };
      synth.keyoff = function(opts) {
        return synth.args[1].keyoff();
      };
      return synth;
    };
    chord_dac.buddy("play", chord, "on");
    chord_dac.buddy("pause", chord, "off");
    bass_dac = T("dac");
    bass = T("mml", "l8 q6 o2 $ [a<a>a<a16a16> f16<ff16>f<f> g<g>g<g16g16 | c<c16c16>>b<b>] c<c16c16>c<c>>");
    bass.synth = T("clip").appendTo(bass_dac);
    bass.synthdef = function(freq, opts) {
      var synth;
      synth = T("*", T("osc", "sin(25)", freq, 8), T("adsr", "24db", 0, 500, 0.7, 150));
      synth.keyon = function(opts) {
        return synth.args[1].bang();
      };
      synth.keyoff = function(opts) {
        return synth.args[1].keyoff();
      };
      return synth;
    };
    bass_dac.buddy("play", bass, "on");
    bass_dac.buddy("pause", bass, "off");
    drum_dac = T("dac");
    drum = T("mml", "l4 v14 $ [c c0e c8.v6e16v14 c0e  c c0e c8.v6e16v14 c0e8|v6e8]v8e16e16v14]");
    drum.synth = T("efx.comp", 0.1, 1 / 40, 5).appendTo(drum_dac);
    drum.synthdef = function(freq, opts) {
      var synth;
      synth = (function() {
        switch (opts.tnum) {
          case 60:
            return T("*", T("rbpf", 80, 0.8, T("osc", "sin(@3)", 20)), T("perc", "32db", 100));
          case 64:
            return T("*", T("hpf", 800, T("pink", 0.15)), T("perc", "24db", 300));
          case 67:
            return T("*", T("hpf", 6400, T("noise", 0.15)), T("perc", "24db", 50));
          case 68:
            return T("*", T("hpf", 8800, T("noise", 0.15)), T("perc", "24db", 200));
          default:
            return T("*", T("noise", 0.6), T("perc", "24db", 250));
        }
      })();
      synth.keyon = function(opts) {
        return synth.args[1].set({
          mul: opts.volume / 16
        }).bang();
      };
      return synth;
    };
    drum_dac.buddy("play", drum, "on");
    drum_dac.buddy("pause", drum, "off");
    buddies = [vocal_dac, chord_dac, bass_dac, drum_dac];
    master = T("efx.reverb", 500, 0.9);
    master.buddy("play", buddies);
    master.buddy("pause", buddies);
    master.isPlaying = false;
    vocal.bpm = chord.bpm = bass.bpm = drum.bpm = 132;
    master.onplay = function() {
      return vocal.onended();
    };
    desc = (function() {
      switch (timbre.env) {
        case "webkit":
          return "timbre.js on Web Audio API";
        case "moz":
          return "timbre.js on Audio Data API";
        default:
          return "Please open with Chrome or Firefox";
      }
    })();
    $("#desc").text(desc);
    return $("#btn").on("click", function() {
      if (master.isPlaying) {
        master.pause();
        $("#btn-img-pause").hide();
        $("#btn-img-play").show();
        return master.isPlaying = false;
      } else {
        master.play();
        $("#btn-img-play").hide();
        $("#btn-img-pause").show();
        return master.isPlaying = true;
      }
    });
  }