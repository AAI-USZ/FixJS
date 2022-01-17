function toVisibleControl (code) {
		// U+2400 - U+243F: Unicode Control Pictures
		if (code == 0x7f) {
			return String.fromCharCode(0x2421);
		}
		if (code >= 0x00 && code <= 0x1f) {
			return String.fromCharCode(0x2400 + code);
		}
		return String.fromCharCode(code);
	}