function setVolume(value) {
		if (!value) return;
		vol = value;
		Ajax.get("Volume", {volume: value});
	}