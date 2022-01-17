function (src, interrupt, delay, offset, loop, volume, pan) {
		if (!SoundJS.checkPlugin(true)) { return null; }
		src = SoundJS.getSrcFromId(src);
		var instance = SoundJS.activePlugin.create(src);
		return SoundJS.playInstance(instance, interrupt, delay, offset, loop, volume, pan);
	}