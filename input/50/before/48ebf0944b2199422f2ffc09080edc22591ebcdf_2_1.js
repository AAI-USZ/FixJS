function(isMuted, id) {
		return SoundJS.tellAllInstances("mute", id, isMuted);
		//LM: Note that there is no "global" mute. Mute just handles all instances.
	}