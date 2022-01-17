function unwatch_FileEventEmitter() {
	  fs.unwatchFile(this.path);
	  this.emit('file::stopped_watching', {path: this.path});
	}