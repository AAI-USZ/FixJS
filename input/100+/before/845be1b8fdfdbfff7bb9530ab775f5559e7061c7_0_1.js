function(nt) {
		switch(nt) {
			case "x":
				this.sounds.kick.sampler.note(this.pitch + this.sounds.kick.pitch);
				break;
			case "o":
				this.sounds.snare.sampler.note(this.pitch + this.sounds.snare.pitch);
				break;
			case "*":
				this.sounds.hat.sampler.note(this.pitch + this.sounds.hat.pitch);
				break;
			case "-":
				this.sounds.openHat.sampler.note(this.pitch + this.sounds.openHat.pitch);
				break;
			default: break;
		}
	}