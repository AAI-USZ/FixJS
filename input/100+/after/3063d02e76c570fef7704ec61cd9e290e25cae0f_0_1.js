function(song) {
	if(song == undefined) return;
	// Tidy the song up
	song = song.replace(/(^')|('$)/g, "");
	song = song + "";
	if(mplayer == undefined) {
		// mplayer = child.spawn('mplayer', ['-slave', '-quiet', song.replace(/(^')|('$)/g, "")]);
		log.info('Spawning new MPlayer process to play ' + song);
		mplayer = child.spawn('mplayer', ['-slave', song]);
		paused = false;
		forcefullyStopped = false;
		setupEmitters(mplayer);
	} else {
		log.info('Telling current MPlayer process to play ' + song);
		MPlayer.pause();
		mplayer.stdin.write('loadfile \'' + song + '\'\n');
		paused = false;
	}
}