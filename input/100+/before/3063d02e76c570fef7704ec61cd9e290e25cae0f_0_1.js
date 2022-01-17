function(song) {
	if(song == undefined) return;
	if(mplayer == undefined) {
		// mplayer = child.spawn('mplayer', ['-slave', '-quiet', song.replace(/(^')|('$)/g, "")]);
		log.info('Spawning new MPlayer process to play ' + song);
		mplayer = child.spawn('mplayer', ['-slave', song.replace(/(^')|('$)/g, "")]);
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