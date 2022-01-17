function(val, volume, shouldTrigger) {
			this.notation = val;
				
			if(typeof this.notation === "string") {
				var _root = this.notation.slice(0,1);
				var _octave, _quality;
				if(isNaN(this.notation.charAt(1))) { 	// if true, then there is a sharp or flat...
					_root += this.notation.charAt(1);	// ... so add it to the root name
					_octave = parseInt( this.notation.slice(2,3) );
					_quality = this.notation.slice(3);
				}else{
					_octave = parseInt( this.notation.slice(1,2) );
					_quality = this.notation.slice(2);
				}
			
				//console.log(_root + " : " + _octave + " : " + _quality);
				var _chord = teoria.note(_root + _octave).chord(_quality);
				for(var j = 0; j < _chord.notes.length; j++) {
					var n = _chord.notes[j];
					this.note(n);
				}
			}else{
				for(var k = 0; k < this.notation.length; k++) {
					var note = this.notation[k];
					this.note(note);
				}
			}
			//if(typeof arguments[1] !== "undefined") { this.trig(arguments[1]); }
			if(typeof arguments[1] === "undefined") {
				this.amp = arguments[1];
				// this.trig(this.amp);
			}
		
			return this;
		}