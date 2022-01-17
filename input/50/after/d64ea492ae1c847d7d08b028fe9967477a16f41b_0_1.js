function(frequency, amp) {
				// from audiolet https://github.com/oampo/Audiolet/blob/master/src/dsp/Square.js
				var out = phase > 0.5 ? 1 : -1;
			    phase += frequency / 44100;
				
			    if (phase > 1) {
			        phase %= 1;
			    }
				return out * amp;
			}