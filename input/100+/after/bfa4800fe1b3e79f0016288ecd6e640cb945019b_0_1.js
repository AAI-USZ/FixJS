function() {
			//check for collision with the pulses
			for(var i = 0; i < g_elements.length; i++){
				var pulse = g_elements[i];
				if (pulse instanceof Pulse && pulse != this.lastCollide){
					var distance = getDistance(pulse.x, pulse.y, this.x, this.y);
					if ((pulse.radius > (distance - this.radius)) && (pulse.radius < (distance + this.radius))){
						this.lastCollide = pulse; //track the last collided pulse to avoid collide again
						console.log('pulse detected at: ' + g_Frames);
						//g_elements is organized such that i+1 will be a pulse
						var nextPulse = g_elements[i+1];
						distance = getDistance(nextPulse.x, nextPulse.y, this.x, this.y) - this.radius;
						remainingDis = distance - nextPulse.radius;
						//add one to account for pulses updating before the reciever
						remainingFrames = Math.floor(remainingDis / nextPulse.growth) + 1;
						if (!this.waveForm){
							this.waveForm = new WaveForm(remainingFrames, 'recieverCanvas');
						} else {
							this.waveForm.generate = remainingFrames;
						}
						break;
					}
				}
			};
			if (this.waveForm){
				this.waveForm.update();
				if (this.waveForm.debugY == 1){
					console.log('wave form peaked at: '+ g_Frames);
				}
			}
		}