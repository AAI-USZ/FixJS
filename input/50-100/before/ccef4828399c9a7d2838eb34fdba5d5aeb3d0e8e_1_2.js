function toVisibleControl (code) {
		// U+2400 - U+243F: Unicode Control Pictures
		return String.fromCharCode(code == 0x7f ? 0x2421 : 0x2400 + code);
	}