function(initializeDefault) {
		if (SoundJS.activePlugin == null) {
			if (initializeDefault && !SoundJS.pluginsRegistered) {
				SoundJS.registerPlugin(SoundJS.HTMLAudioPlugin);
			}
			if (SoundJS.activePlugin == null) {
				return false;
			}
		}
		return true;
	}