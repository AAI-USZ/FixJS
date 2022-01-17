function() {
			//check for collision with the pulses
			for(var i = 0; i < g_elements.length; i++){
				var pulse = g_elements[i];
				if (pulse instanceof Pulse && pulse != this.lastCollide){
					var distance = getDistance(pulse.x, pulse.y, this.x, this.y);
					if ((pulse.radius > (distance - this.radius)) && (pulse.radius < (distance + this.radius))){
						this.lastCollide = pulse; //track the last collided pulse to avoid collide again
						//g_elements is organized such that i+1 will be a pulse
						var nextPulse = g_elements[i+1];
						distance = getDistance(nextPulse.x, nextPulse.y, this.x, this.y);
						remainingDis = distance - nextPulse.radius;
						remainingFrames = remainingDis / nextPulse.growth;
						if (!this.waveForm){
							this.waveForm = new WaveForm(remainingFrames, 'recieverCanvas');
						} else {
							this.waveForm.pulse = remainingFrames;
						}
						break;
					}
				}
			};
			if (this.waveForm){
				this.waveForm.update();
			}
		}