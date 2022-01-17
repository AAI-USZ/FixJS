function() {
		//console.log("ADVANCE");
		if(this.active) {
			//console.log("ACTIVE");
			var pos, val;
			
			if(this.end) {
				if(this.counter % this[this.endSequence].length === 0) {
					this.stop();
					if(this.endFunction !== null) {
						this.endFunction();
					}
					return;
				}
			}
			
			var shouldReturn = false; 
			var nextPhase = 0;
			if(this.prevHumanize) {
				nextPhase += this.prevHumanize * -1;
			}
			
			if(this.humanize) {
				this.prevHumanize = rndi(this.humanize * -1, this.humanize);
				nextPhase += this.prevHumanize;
			}
			
			if(this.shouldUseOffset) { // only used when Seq object is first initialized to set the offset; afterwards scheduling is handled in property setter
				nextPhase += this.offset;
				this.shouldUseOffset = false;
				shouldReturn = true;
				
				// only use duration with negative offset
				if(this.offset < 0) {
					if(this.durations != null) {
						if(this.durations.pick != null) {
							nextPhase += this.durations.pick();
						}else{
							nextPhase += this.durations[this.durationCounter % this.durations.length]
						}
					}else{
						nextPhase += this.speed;
					}
				}
			}else{
				if(this.durations != null) {
					if(this.durations.pick != null) {
						nextPhase += this.durations.pick();
					}else{
						nextPhase += this.durations[this.durationCounter % this.durations.length]
					}
				}else{
					nextPhase += this.speed;
				}
			}
			// TODO: should this flip-flop between floor and ceiling instead of rounding?
			nextPhase = Math.round(nextPhase);
			//if(nextPhase == 0) return;
			
			this.nextEvent = G.callback.addEvent(nextPhase, this);
			
			//if(typeof this.sequence === "undefined" || this.sequence === null) return;
			
			//if(shouldReturn) return;a.mods
//			console.log(this.sequences);
			// TODO : an array of keys? can't this just loop through an object with the appropriate values? 
			// pretty sure I made this decision to easy live coding (no need to specify sequences array) but it's weird...
			for(var i = 0; i < this.sequences.length; i++) {
				var key = this.sequences[i];
				var seq = this[key];
//				console.log(key);
				var usePick = (typeof seq.pick !== "undefined");
				
				if(!usePick) {
					pos = this.counter % seq.length;
				}
				if(!usePick) {
					val = seq[pos];
				}else{
					val = seq.pick();
				}
				
				if(this.slaves.length === 0 && key === "note") { // if a mod... note is the default sequence value
				 	this.value = val;
				}
				
				//G.log("key : " + key + " , val : " + val + ", pos : " + pos);
						
				// Function sequencing
				// TODO: there should probably be a more robust way to to this
				// but it will look super nice and clean on screen...
				if(key === "function") {
					if(!shouldReturn) {
						val();
						this.counter++;
						this.durationCounter++;
					}
					return;
				}else if(typeof val === "undefined") {
					if(!shouldReturn) {
						this.counter++;
						this.durationCounter++;
					}
					return;
				}
				
				for(var j = 0; j < this.slaves.length; j++) {
					var _slave = this.slaves[j];
						
					if(key === "freq" || key === "frequency") {
						if(! $.isArray(val) ) {
							if(typeof val === "string" ) {
								var nt = teoria.note(val);
								val = nt.fq();
							}else if(typeof val === "object"){
								val = val.fq();
							}// else val is a number and is fine to send as a freq...
						}else{
							if(typeof val[0] === "string" ) {
								var nt = teoria.note(val[0]);
								val[0] = nt.fq();
							}else if(typeof val[0] === "object"){ // for ScaleSeqs and Arps
								val[0] = val[0].fq();
							}
						}
					}
					//console.log("ADVANCING", key, _slave);	
					if(typeof _slave[key] === "function") {
						if(key === "note" && val === 0) { // advance envelope instead of changing freq
							if(typeof _slave.env === "object") {
								_slave.env.state = 1;
							}
						}else{
							if($.isArray(val)) {
								_slave[key].apply(_slave, val);									
							}else{
								_slave[key](val);
							}
						}
					}else{
						_slave[key] = val;
					}
				}
			}
			
			this.counter++;
			this.durationCounter++;
			
			// if(!usePick && this.counter % this.sequence.length === 0) {
			// 	if(this.shouldDie) {
			// 		this.kill();
			// 	}
			// }
			//}
		}	},
