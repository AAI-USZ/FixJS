function(attack,decay) {
				if(state === 0){
					var incr = 1 / attack;
					phase += incr;
					if(phase >=1) {
						state++;
					}
				}else if(state === 1){
					var incr = 1 / decay;
					phase -= incr;
					if(phase <= 0) state++;;			
				}
				return phase;
			}