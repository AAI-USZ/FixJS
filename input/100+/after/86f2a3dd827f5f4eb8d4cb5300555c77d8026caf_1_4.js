function mouseUp(ev) {
		var id, pos = {x: ev.offsetX || ev.layerX, y: ev.offsetY || ev.layerY};
		
		if(this.scrubActive){
			this.scrubActive = false;
			updateCursor.call(this,pos);
		}else if(this.scrollInterval){
			clearInterval(this.scrollInterval);
			this.scrollInterval = null;
			for(id in this.audio){ this.audio[id].redraw(); }
		}else if(this.currentTool == Timeline.REPEAT
			&& !this.abRepeatOn && this.repeatA != this.repeatB) {
			this.setB(pos);
		}else if(this.sliderActive) {
			this.slider.mouseUp(pos);
			this.sliderActive = false;
			for(id in this.audio){ this.audio[id].redraw(); }
		}else if(this.activeElement) {
			this.activeElement.mouseUp(pos);
			this.activeElement = null;
		}
		
		ev.preventDefault();
	}