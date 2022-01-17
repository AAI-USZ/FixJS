function(frequency, amp) {
				while(phase++ >= 44100 / frequency) {
					cycle *= -1;
					phase -= 44100;
				}
				return cycle;
			}