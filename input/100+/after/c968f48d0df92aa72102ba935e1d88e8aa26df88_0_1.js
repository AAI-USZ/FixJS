function(song) {
	if(song == undefined) return;
	// Tidy the song up
	var path = song.path.replace(/(^')|('$)/g, "");
	path = S(path).replaceAll('\'', "'").s;
	path = path + "";
	if(mplayer == undefined) {
		// mplayer = child.spawn('mplayer', ['-slave', '-quiet', song.replace(/(^')|('$)/g, "")]);
		// log.info('Spawning new MPlayer process to play ' + song);
		if(volume > 0) {
			mplayer = child.spawn("mplayer", ["-slave", "-quiet", "-volume", volume, path]);
		} else {
			mplayer = child.spawn("mplayer", ["-slave", "-quiet", path]);
		}
		paused = false;
		forcefullyStopped = false;
		setupEmitters(mplayer);
		eventEmitter.emit('playing', !paused);
	} else {
		// log.info('Telling current MPlayer process to play ' + song);
		MPlayer.pause();
		// Trying to stop audible pop during song switchover
		// Might be a kernel module issue on the RPi though
		setTimeout(function() {
			mplayer.stdin.write("loadfile \"" + path + "\"\n");
			paused = false;
			eventEmitter.emit('paused', paused);
			eventEmitter.emit('playing', !paused);
		}, 50);
	}
	log.info("Playing " + song.name + " by " + song.artist_name);
}