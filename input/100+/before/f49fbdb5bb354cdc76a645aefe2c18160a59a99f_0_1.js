function(oSettings, oData, iDataIndex) {

	// pull the song and the global meta data
	var key = oData[0] + oData[1] + oData[2];
	var song = APP.songs.placed[key];
	var selectedPhrases = APP.select.phrases;
	var selectedImages = APP.select.images;
	
	// only keep songs that are associated with the selected images
	for (var img in selectedImages) {
		console.log(song.img + " === " + img);
		if (!(song.img === img)) {
			return false;
		}
	}

	// only keep songs that possess all the selected phrases
	for ( var phrase in selectedPhrases) {
		if (!song.metadata.hasOwnProperty(phrase)) {
			// it doesn't possess the current selected metadata, filter it out!
			return false;
		}
	}

	// this song possessed all the selected metadata, keep it!
	return true;
}