function(instance, interrupt, offset, loop, volume, pan) {
		if (!SoundChannel.add(instance, interrupt)) { return false; }
		var result = instance.beginPlaying(offset, loop, volume, pan);
		if (result == -1) {
			this.instances.splice(this.instances.indexOf(instance), 1);
			delete this.instanceHash[instance.uniqueId];
			return false;
		}
		return true;
	}