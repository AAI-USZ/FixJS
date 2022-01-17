function(isMuted) {
		this.muted = isMuted;
		return SoundJS.tellAllInstances("mute", null, isMuted);
	}