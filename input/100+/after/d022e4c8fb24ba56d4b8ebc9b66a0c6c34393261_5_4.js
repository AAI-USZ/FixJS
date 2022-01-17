function mouseMove(ev) {
		var canvasTop = $(this.ctx.canvas).offset().top,
			pos = {x: ev.pageX, y: ev.pageY-canvasTop};

		this.updateCursor(pos);

		if(this.currentTool == Timeline.REPEAT
			&& this.repeatA != null && !this.abRepeatOn){
			this.updateB(pos);
		}else if(this.segmentPlaceholder != null){
			this.segmentPlaceholder.mouseMove(pos);
		}else if(this.sliderActive){
			this.slider.mouseMove(pos);
		}else if(this.activeElement != null){
			this.activeElement.mouseMove(pos);
		}
	}