function (type) {
		var nstats, nwatcher;
		// console.log("EVENT", path, type, !!emitter, !!stats, stats && stats.isFile(), done);
		watcher.close();
		try {
			nwatcher = watch(path, opts, listener);
		} catch (e) {
			if (e.code === 'EMFILE') {
				// Shouldn't happen, but we can't be 100% sure
				// Too many concurrent watches, fallback to manual stat based watch
				try {
					watchAlt(path, emitter);
					return;
				} catch (e) {}
			}
			onEnd();
			return;
		}
		watcher = nwatcher;
		watcher.on('error', onEnd);
		if (!stats || done) {
			return;
		}
		if ((type === 'rename') || stats.isFile()) {
			done = true;
			nextTick(clearDone);
			lstat(path).end(function (nstats) {
				var newFileType;
				if (!emitter) {
					return;
				}
				newFileType = getTypeFromStat(nstats);
				if (fileType !== newFileType) {
					onEnd();
					return;
				}
				if (stats.isDirectory() ||
					 ((stats.ctime.valueOf() !== nstats.ctime.valueOf()) ||
						 ((stats.mtime.valueOf() !== nstats.mtime.valueOf()) ||
							 (stats.size !== nstats.size)))) {
					emitter.emit('change');
				}
				stats = nstats;
			}, onEnd);
		}
	}