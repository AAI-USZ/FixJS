function(frequency, amp, attack, decay ) {
				var val = osc(frequency, amp) * env(attack, decay);
				//if(phase++ % 22050 === 0) console.log(val, amp);
				return val;
			}