function (src, interrupt, delay, offset, loop, volume, pan) {
		if (!SoundJS.checkPlugin(true)) { return SoundJS.defaultSoundInstance; }
		src = SoundJS.getSrcFromId(src);
		var instance = SoundJS.activePlugin.create(src);
		instance.mute(SoundJS.muted);
		var ok = SoundJS.playInstance(instance, interrupt, delay, offset, loop, volume, pan);
		if (!ok) { instance.playFailed(); }
		return instance;
	}