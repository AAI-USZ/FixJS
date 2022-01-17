function(gibberish) {			
			gibberish.generators.Synth = gibberish.createGenerator(["frequency", "amp", "attack", "decay"], "{0}( {1}, {2}, {3}, {4} )");
			gibberish.make["Synth"] = this.makeSynth;
			gibberish.Synth = this.Synth;
			
			gibberish.generators.PolySynth = gibberish.createGenerator(["amp", "attack", "decay"], "{0}( {1}, {2}, {3} )");
			gibberish.make["PolySynth"] = this.makePolySynth;
			gibberish.PolySynth = this.PolySynth;
			
			gibberish.generators.FMSynth = gibberish.createGenerator(["frequency", "cmRatio", "index", "attack", "decay", "amp"], "{0}( {1}, {2}, {3}, {4}, {5}, {6})");
			gibberish.make["FMSynth"] = this.makeFMSynth;
			gibberish.FMSynth = this.FMSynth;
			
			gibberish.generators.PolyFM = gibberish.createGenerator(["cmRatio", "index", "attack", "decay", "amp"], "{0}( {1}, {2}, {3}, {4}, {5})");
			gibberish.make["PolyFM"] = this.makePolyFM;
			gibberish.PolyFM = this.PolyFM;
			
			gibberish.generators.Synth2 = gibberish.createGenerator(["frequency", "amp", "attack", "decay", "sustain", "release", "attackLevel", "sustainLevel", "cutoff", "resonance", "filterMult", "isLowPass"], "{0}( {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12} )");
			gibberish.make["Synth2"] = this.makeSynth2;
			gibberish.Synth2 = this.Synth2;
			
			gibberish.generators.PolySynth2 = gibberish.createGenerator(["amp", "attack", "decay", "sustain", "release", "attackLevel", "sustainLevel", "cutoff", "resonance", "filterMult", "isLowPass"], "{0}( {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11})");
			gibberish.make["PolySynth2"] = this.makePolySynth2;
			gibberish.PolySynth2 = this.PolySynth2;
		}