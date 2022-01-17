function() {
			mplayer.stdin.write("loadfile \"" + path + "\"\n");
			paused = false;
			eventEmitter.emit('paused', paused);
			if(volume > 0) {
				mplayer.stdin.write("set_property volume " + volume + "\n");
			}
			eventEmitter.emit('playing', !paused);
		}