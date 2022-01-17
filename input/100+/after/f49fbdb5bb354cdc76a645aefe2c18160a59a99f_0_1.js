function(oSettings, oData, iDataIndex) {

	// pull the song and the global meta data
	var key = oData[0] + oData[1] + oData[2];
	var song = APP.songs.placed[key];
	var selectedPhrases = APP.select.phrases;
	var selectedImages = APP.select.images;

	// only keep songs that possess one of the selected images
	var hasImg = APP.util.isEmpty(selectedImages) ? true : false;
	for ( var img in selectedImages) {
		if (song.img === img) {
			hasImg = true;
		}
	}

	// only keep songs that possess all the selected phrases
	var hasPhrases = true;
	for ( var phrase in selectedPhrases) {
		if (!song.metadata.hasOwnProperty(phrase)) {
			// it doesn't possess the current selected metadata, filter it out!
			hasPhrases = false;
		}
	}

	// this song possessed all the selected metadata, keep it!
	return (hasImg && hasPhrases);
}