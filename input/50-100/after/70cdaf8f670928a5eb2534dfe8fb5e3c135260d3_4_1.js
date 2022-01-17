function(osc, env) { // note, storing the increment value DOES NOT make this faster!
			var phase = 0;
			var _frequency = 0;
			var output = function(frequency, amp, attack, decay ) {
				var val = osc(frequency || _frequency, amp) * env(attack, decay);
				//if(phase++ % 22050 === 0) console.log(val, amp);
				return val;
			}
			output.setFrequency = function(freq) 	{ _frequency = freq; };
			output.getFrequency = function() 		{ return _frequency; };
			
			return output;
		}