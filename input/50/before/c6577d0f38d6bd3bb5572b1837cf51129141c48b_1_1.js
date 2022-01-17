function setVolume(value) {
		vol = value;
		Ajax.get("Volume", {volume: value});
	}