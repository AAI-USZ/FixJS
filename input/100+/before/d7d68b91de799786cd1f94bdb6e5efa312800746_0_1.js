function Flanger(rate, amount, feedback, offset) {
	var that = {
		rate: (typeof rate !== "undefined") ? rate : .25,
		amount: (typeof amount !== "undefined") ? amount : 125,
		name : "Flanger",
		type: "fx",
		gens :  [],
		mods :  [],
		value : 0,
		writeIndex : 0,
		mix : 1,
		feedback : (isNaN(feedback)) ? .25 : feedback,

		buffer : new Float32Array(Gibber.sampleRate * 2),
		bufferSize : Gibber.sampleRate * 2,

		pushSample : function(sample) {
			var r = this.readIndex + this.delayMod.out();
			if(r > this.bufferSize) {
				r = r - this.bufferSize;
			}else if(r < 0) {
				r = this.bufferSize + r;
			}
			
			var s = Sink.interpolate(this.buffer, r);

			this.buffer[this.writeIndex++] = sample + (s * this.feedback);
			if (this.writeIndex >= this.bufferSize) {
				this.writeIndex = 0;
			}
			
			this.readIndex++;
			if (this.readIndex >= this.bufferSize) {
				this.readIndex = 0;
			}
			
			this.value = s + sample;
		},
		getMix : function() {
			return this.value;
		},
	};
	
	that.offset = offset || that.amount;
	that.readIndex = that.offset * -1;
	that.delayMod = LFO(that.rate, that.amount * .95); // *.95 to ensure it never catches up with write head
	
	Gibber.addModsAndFX.call(that);
	
	// TODO: Fix so this changes the speed of the LFO
	(function(obj) {
		var _that = obj;
		var rate = that.rate;
	
	    Object.defineProperties(_that, {
			"rate" : { 
				get: function() {
					return rate;
				},
				set: function(value) {
					rate = value;
					_that.delayMod.frequency = rate;
				}
			},
		});
	})(that);
	
	return that;
}