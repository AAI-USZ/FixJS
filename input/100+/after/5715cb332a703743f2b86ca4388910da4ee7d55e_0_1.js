function makePlaylist() {
	console.log("in makePlaylist");
	var artist = $("#_artist").val();
	var songTitle = $("#_song_title").val();
	var artistHot = $("#_artist_hot").val();
	var songHot = $("#_song_hot").val();
	var variety = $("#_variety").val();
	var catRadio = $("#_cat_radio").prop('checked');
	
	console.log( "catRadio is " + catRadio );
	if( songTitle ) {
		getSongIDFromTitle( artist, songTitle, artistHot, songHot, variety, catRadio );
	} else {
		innerGeneratePlaylist( artist, null, null, artistHot, songHot, variety, catRadio );
	}
}