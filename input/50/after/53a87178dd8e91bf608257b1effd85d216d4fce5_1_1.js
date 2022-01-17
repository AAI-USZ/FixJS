function unwatch_FileEventEmitter() {
	  fs.unwatchFile(this.path);
	  this.emit('async-fs::file::stopped_watching', {path: this.path});
	}