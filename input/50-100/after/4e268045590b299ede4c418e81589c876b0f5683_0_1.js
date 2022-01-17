function() {
			mplayer.stdin.write("loadfile \"" + path + "\"\n");
			paused = false;
			eventEmitter.emit('paused', paused);
			eventEmitter.emit('playing', !paused);
		}