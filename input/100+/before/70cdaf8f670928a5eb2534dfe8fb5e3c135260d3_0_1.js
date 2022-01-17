function _Drums (_sequence, _timeValue, _amp, _freq){
	this.amp   = isNaN(_amp) ? .4 : _amp;
	
	this.sounds = {
		kick 	: { sampler: Gibberish.Sampler("http://127.0.0.1/~charlie/gibber/audiofiles/kick.wav"), pitch:0, amp:this.amp },
		snare	: { sampler: Gibberish.Sampler("http://127.0.0.1/~charlie/gibber/audiofiles/snare.wav"),pitch:0, amp:this.amp },
		hat		: { sampler: Gibberish.Sampler("http://127.0.0.1/~charlie/gibber/audiofiles/hat.wav"), 	pitch:0, amp: this.amp }, 
		openHat	: { sampler: Gibberish.Sampler("http://127.0.0.1/~charlie/gibber/audiofiles/openhat.wav"), pitch:0, amp:this.amp },
	}
	
	this.bus = Gibberish.Bus();
	
	this.sounds.kick.sampler.send(this.bus, this.amp);
	this.sounds.snare.sampler.send(this.bus, this.amp);
	this.sounds.hat.sampler.send(this.bus, this.amp);
	this.sounds.openHat.sampler.send(this.bus, this.amp);	
		
	this.bus.connect(Master);
	
	this.frequency = isNaN(_freq) ? 440 : _freq;
	
	this.active = true;
	this.masters = [];
	this.pitch = 1; // pitch is a mod to frequency; only used when the value is set
	
	this.sequenceInit =false;
	this.initialized = false;
	this.seq = null;
	
	var that = this; // closure so that d.shuffle can be sequenced
	this.shuffle = function() { console.log("SHUFFLE"); that.seq.shuffle(); };
	this.reset = function() { that.seq.reset(); };
	
	if(typeof arguments[0] === "object") {
		var obj = arguments[0];
		
		for(key in obj) {
			this[key] = obj[key];
		}
		
		this.seq = Seq({
			doNotAdvance : true,
			note : 	this.sequence.split(""),
			speed : 	this.speed,
			slaves :	[this],
		});
	}else if(typeof _sequence != "undefined") {
		if(typeof _timeValue !== "undefined") {
			if($.isArray(_timeValue)) {
				this.seq = Seq({
					doNotAdvance : true,					
					note :_sequence.split(""),
					durations : _timeValue,
					slaves:[this],
				});
			}else{
				this.seq = Seq({
					doNotAdvance : true,					
					note :_sequence.split(""),
					speed : _timeValue,
					slaves:[this],
				});
			}
		}else{
			_timeValue = window["_"+_sequence.length];
			this.seq = Seq({
				doNotAdvance : true,					
				note :_sequence.split(""),
				speed : _timeValue,
				slaves:[this],
			});
		}
	}
	
	//this.seq = {};
	(function(obj) {
		var that = obj;
		
	    Object.defineProperties(that, {
			"speed" : {
		        get: function() {
		            return that.seq.speed;
		        },
		        set: function(value) {
					if(that.seq != null) {
						that.seq.speed = value;
					}
		        }
			},
			
			"amp" : {
		        get: function() {
		            return amp;
		        },
		        set: function(value) {
					amp = value;
					for(var sound in this.sounds) {
						console.log("DISCONNECTING", sound);
						this.sounds[sound].sampler.disconnect();
						this.sounds[sound].sampler.send(this.bus, this.amp);
					}
		        }
			},
			
	    });
	})(this);
	//if(this.pitch != 1) this.pitch = arguments[0].pitch;
	
	if(this.seq !== null) {
		this.seq.doNotAdvance = false;
		this.seq.advance();
	}
}