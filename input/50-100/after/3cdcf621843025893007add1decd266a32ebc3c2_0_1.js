function(){
		if(_this.sound) _this.sound.destruct()
		_this.tracks = [];
		$this.off();
		$this.remove();
		delete _this.tracks;
		delete _this.track;
		delete _this;
		delete this;
	}