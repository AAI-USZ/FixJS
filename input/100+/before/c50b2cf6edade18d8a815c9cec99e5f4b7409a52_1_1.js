function ($, fluid) {
    fluid.defaults("automm.oscillator", {
        gradeNames: ["fluid.modelComponent", "autoInit"],
        preInitFunction: "automm.oscillator.preInitFunction",
        postInitFunction: "automm.oscillator.postInitFunction",
        
        model: {
            freq: 440,
            osc: "flock.ugen.sinOsc",
            attack: 0.25,
            sustain: 0.6,
            release: 0.5,
            gate: 0
        },
        
        // Maps parameter between this model and the model of flocking
        paramMap: {
            "freq": "carrier.freq",
            "attack": "asr.attack",
            "sustain": "asr.sustain",
            "release": "asr.release",
            "gate": "asr.gate"
        }
    });
    
    automm.oscillator.preInitFunction = function (that) {
        that.osc = flock.synth({
            id: "carrier",
            ugen: that.model.osc,
            freq: that.model.freq,
            mul: {
                id: "asr",
                ugen: "flock.ugen.env.simpleASR",
                attack: that.model.attack,
                sustain: that.model.sustain,
                release: that.model.release
            }
        });
    };
    
    
    automm.oscillator.postInitFunction = function (that) {
        
        // That.update creates a function that takes a parameter from the model
        // and updates it's value
        //  the applier directly below adds a listener to all instances of the model chaning
        //  it then updates the synth accordingly
        
        that.applier.modelChanged.addListener("*", function (newModel, oldModel, changeSpec) {
            var path = changeSpec[0].path;
            var oscPath = that.options.paramMap[path];
            that.osc.input(oscPath, newModel[path]);
        });
        
        that.update = function (param, value) {
            that.applier.requestChange(param, value);
        };

        flock.enviro.shared.play();    
    };
    
}