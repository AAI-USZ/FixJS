function() {
	/** @type {!Element} */
	var elem = goog.dom.createElement('audio');
	var types = null;

	try {
		if (elem.canPlayType) {
			types = {};
			types.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
			types.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');

			// Mimetypes accepted:
			//   https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
			//   http://bit.ly/iphoneoscodecs
			types.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
			types.m4a = elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;').replace(/^no$/, '');
		}
	} catch(e) { }

	return types;
}