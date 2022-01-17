function addFrameContents(f) {
		try {
			scanText(f.document.documentElement.innerHTML);
			scanText(unescape(f.document.documentElement.innerHTML));
		} catch (err) {
			return;
		}
		// find frames
		var frames = Array.prototype.slice.call(f.frames);
		while (frames.length) try {
			addFrameContents(frames.shift());
		} catch (err) {}
		// find iframes
		var frames = Array.prototype.slice.call(f.document.getElementsByTagName('iframe'));
		while (frames.length) try {
			addFrameContents(frames.shift().contentWindow);
		} catch (err) {}
	}