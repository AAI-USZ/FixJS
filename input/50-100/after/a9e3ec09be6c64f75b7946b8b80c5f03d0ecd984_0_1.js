function(initializeDefault) {
		if (SoundJS.activePlugin == null) {
			if (initializeDefault && !SoundJS.pluginsRegistered) {
				// preferring WebAudio over HTMLAudio
				if (!SoundJS.registerPlugin(SoundJS.WebAudioPlugin)) {
					SoundJS.registerPlugin(SoundJS.HTMLAudioPlugin);
				}
			}
			if (SoundJS.activePlugin == null) {
				return false;
			}
		}
		return true;
	}