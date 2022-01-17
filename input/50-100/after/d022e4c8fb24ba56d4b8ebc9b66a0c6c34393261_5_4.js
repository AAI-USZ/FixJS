function(time) {
		
		if(time == this.timeMarkerPos){ return; }
		
		// Check the repeat
		if(this.abRepeatOn && time > this.repeatB) {
			time = this.repeatA;
			this.emit('jump',this.repeatA);
		}

		this.timeMarkerPos = time;
		this.updateCurrentSegments();
		this.emit('timeupdate', time);
		
		/*if(this.timeMarkerPos > this.pixelToTime(this.view.width))
			this.moveTimeMarkerIntoView(time);
		else*/
			this.render();
	}