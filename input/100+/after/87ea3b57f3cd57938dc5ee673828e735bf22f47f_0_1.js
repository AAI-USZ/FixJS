function(_chord, shouldReset) {
		var arr = [];
		
		this.notation = _chord;

		for(var i = 0; i < this.mult; i++) {
			var tmp = [];
			
			var _root = this.notation.slice(0,1);
			var _octave, _quality;
			if(isNaN(this.notation.charAt(1))) { 	// if true, then there is a sharp or flat...
				_root += this.notation.charAt(1);	// ... so add it to the root name
				_octave  = parseInt( this.notation.slice(2,3) );
				_quality = this.notation.slice(3);
			}else{
				_octave  = parseInt( this.notation.slice(1,2) );
				_quality = this.notation.slice(2);
			}
			_octave += i;

			var _chord = teoria.note(_root + _octave).chord(_quality);
			for(var j = 0; j < _chord.notes.length; j++) {
				var n = _chord.notes[j];
				tmp[j] = n;
			}
			arr = arr.concat(tmp);
		}	
		this.note = this.modes[this.mode]( arr );
		this.sequences.push("note");
		
		// if(this.init) {
		// 	this.sequences.note = this.notes;
		// 	//this.setSequence(this.notes, this.speed, shouldReset);
		// }
	}