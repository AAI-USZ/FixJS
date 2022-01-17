function actuallyPlayTrack( track, song ) {
	activePlaylist.add( track );

	player.play( track.data.uri, activePlaylist, 0 );

	nowPlayingArtist = new Artist({
		model:dynplayModel
		});
	nowPlayingArtist.artistID = song.artist_id;
	nowPlayingArtist.artistName = song.artist_name;

	nowPlayingSong = new Song({
			model:dynplayModel
		});
	nowPlayingSong.songTitle = song.title;
	nowPlayingSong.songID = song.id;
	nowPlayingSong.releaseYear = track.data.album.year;
	nowPlayingSong.albumName = track.data.album.name;
	nowPlayingSong.artist = nowPlayingArtist;

	updateNowPlaying( nowPlayingSong, track.data.album.cover);

	if( tpID ) {
		updateTasteProfileWithPlay( tpID, song.id );
	}

	nowPlayingArtist.gatherArtistLinks();
	nowPlayingArtist.gatherArtistBios();
	// reset the rating field
	$("input[type=range]").val("5");

	// re-enable the make new playlist button
	$("#_play").attr("disabled",false);

}