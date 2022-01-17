function(value) {
					if(waveform !== value) {
						waveform = value;
						that.osc = Gibberish.make[value]();
						that.dirty = true;
						Gibberish.dirty = true;
					}
				}