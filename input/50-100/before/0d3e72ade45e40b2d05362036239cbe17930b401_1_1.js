function(attack,decay) {
				var val = 0;
				if(state === 0){
					val = phase / attack;
					if(++phase % attack === 0) {
						state++;
						phase = decay;
					}
				}else if(state === 1){
					val = phase / decay;
					if(--phase === 0) state++;;			
				}
				return val;
			}