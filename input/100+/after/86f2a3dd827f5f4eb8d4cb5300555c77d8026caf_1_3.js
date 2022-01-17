function mouseMove(ev) {
		var i, pos = {x: ev.offsetX || ev.layerX, y: ev.offsetY || ev.layerY};
		
		this.mousePos = pos;
		
		if(this.scrollInterval){ return; }
		if(this.scrubActive){
			i = this.view.pixelToTime(pos.x);
			this.emit('jump',i);
			this.currentTime = i;
		}else if(this.currentTool == Timeline.REPEAT
			&& this.repeatA != null && !this.abRepeatOn){
			this.updateB(pos);
		}else if(this.sliderActive){
			this.slider.mouseMove(pos);
		}else if(this.activeElement){
			this.activeElement.mouseMove(pos);
		}else{
			updateCursor.call(this,pos);
		}
		
		ev.preventDefault();
	}