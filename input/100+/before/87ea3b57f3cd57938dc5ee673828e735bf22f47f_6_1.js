function Synth(attack, decay, volume) {	
	this.env = Env();
	this.osc = Osc(440, 1, "triangle", false).silent();
	
	(function(obj) {
		var that = obj;
		var frequency = that.osc.frequency;
		var attack = that.env.attack;
		var decay  = that.env.decay;
		var sustain = that.env.sustain;
		var sustainTime = that.env.sustainTime;
		var waveShape = that.osc.waveShape;
	
	    Object.defineProperties(that, {
			"frequency" : {
				get : function() {
					return this.osc.frequency;
				},
				set : function(val) {
					this.osc.frequency = val;
				}
			},
			"waveShape" : {
		        get: function() {
		            return waveShape;
		        },
		        set: function(value) {
		            waveShape = value;
					this.osc.waveShape = value;
		        }
			},
			
			"attack" : {
		        get: function() {
		            return attack;
		        },
		        set: function(value) {
		            attack = value;
					this.env.attack = value;
		        }
			},
			"decay" : {
		        get: function() {
		            return decay;
		        },
		        set: function(value) {
		            decay = value;
					this.env.decay = value;
		        }
			},
			"sustain" : {
		        get: function() {
		            return sustain;
		        },
		        set: function(value) {
		            sustain = sustain;
					this.env.sustain = value;
		        }
			},
			"sustainTime" : {
		        get: function() {
		            return sustainTime;
		        },
		        set: function(value) {
		            sustainTime = value;
					this.env.sustainTime = value;
		        }
			},
	    });
	})(this);
	this.envRetrigger = false;
	
	if(typeof arguments[0] === "object") {
		var obj = arguments[0];
		
		for(key in obj) {
			this[key] = obj[key];
		}
	}else{
		this.amp = isNaN(volume) ? .4 : volume;
		if(!isNaN(attack)) this.env.attack = attack;
		if(!isNaN(decay)) this.env.decay = decay;
	}
	
	this.amp = this.amp || .4;
	
	this.waveShape = this.waveShape || "triangle";
	
	this.frequency = 440;
	this.phase = 0;
	this.value = 0;
	this.active = true;
	
	this.mods = [];
	this.fx = [];
	this.sends = [];
	this.masters = [];
	
	Gibber.generators.push(this);
	Gibber.addModsAndFX.call(this);
}