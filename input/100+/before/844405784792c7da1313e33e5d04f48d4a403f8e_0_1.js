function updateCursor(pos) {
		if(typeof pos !== 'object')
			return;
		var i,j,track,seg,shape,
			cursor = 'pointer';
		
	
		// Check the slider
		i = this.slider.onHandle(pos);
		if(i === 1) {
			cursor = 'resizeR';
		}else if(i === -1) {
			cursor = 'resizeL';
		}else if(this.slider.containsPoint(pos)) {
			cursor = 'move';
		}else
		// Check the key
		if(pos.y < this.keyHeight+this.trackPadding) {
			cursor = 'skip';
		}else if(this.currentTool === Timeline.REPEAT){
			if(!this.abRepeatOn){
				cursor = this.repeatA == null?'repeatA':'repeatB';
			}
		}else if(this.currentTool === Timeline.SCROLL){
			cursor = (
						(this.mousePos.y < this.height - this.sliderHeight - this.trackPadding)
						&& (this.mousePos.x < this.width/2)
						|| (this.mousePos.x < this.slider.middle)
					)?'resizeL':'resizeR';
		}else 
		track_cursor: // Are we on a track?
		if(track = this.trackFromPos(pos)){
			if(!track.active || track.locked){
				cursor = 'locked';
				break track_cursor;
			}
			if(this.currentTool === Timeline.CREATE){
				 cursor = 'add';
			}else{
				//Are we on a segment?
				//traverse backwards so you get the ones on top
				for(j=track.visibleSegments.length-1;seg=track.visibleSegments[j];j--){
					if(!seg.containsPoint(pos)){ continue; }
					shape = seg.getShape();
					switch(this.currentTool){
						case Timeline.SELECT:
							cursor = 'select';
							break track_cursor;
						case Timeline.MOVE:
							cursor = 'move';
							break track_cursor;
						case Timeline.DELETE:
							cursor = 'remove';
							break track_cursor;
						case Timeline.RESIZE:
							cursor = (pos.x < shape.x + shape.width/2)?'resizeL':'resizeR';
							break track_cursor;
					}
				}
			}
		}
		if(this.currentCursor != cursor){
			this.currentCursor = cursor;
			this.canvas.style.cursor = this.cursors[cursor];
		}
	}