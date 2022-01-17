function(pos) {
		if(typeof pos !== 'object')
			return;
		var i,j,track,seg,shape,cursor = "";
		
		// Check the slider
		if(this.slider.containsPoint({x: this.slider.x, y: pos.y})) {
			cursor = "url(\"./images/cursors/cursor.png\"), auto";
		}else if(pos.y < this.keyHeight) { // Check the key
			cursor = "url(\"./images/cursors/skip.png\"), auto";
		}else
		select_cursor: {
			switch(this.currentTool){
				case Timeline.CREATE:
					cursor = "url(\"./images/cursors/add.png\"), auto";
					break select_cursor;
				case Timeline.REPEAT:
					cursor = this.abRepeatOn?"url(\"./images/cursors/cursor.png\"), auto":
							this.repeatA == null?"url(\"./images/cursors/repeat-a.png\"), auto":
							"url(\"./images/cursors/repeat-b.png\"), auto";
					break select_cursor;
			}
			// Are we on a subtitle
			for(i=0;track=this.tracks[i];i++) {
				if(!(track instanceof segmentTrack)){ continue; }
				//traverse backwards so you get the ones on top
				for(j=track.visibleSegments.length-1;seg=track.visibleSegments[j];j--) {
					if(!seg.containsPoint(pos)){ continue; }
					shape = seg.getShape();
					switch(this.currentTool){
						case Timeline.SELECT:
							cursor = "url(\"./images/cursors/cursor-highlight.png\"), auto";
							break select_cursor;
						case Timeline.MOVE:
							cursor = "url(\"./images/cursors/move.png\"), move";
							break select_cursor;
						case Timeline.DELETE:
							cursor = "url(\"./images/cursors/delete.png\"), pointer";
							break select_cursor;
						case Timeline.RESIZE:
							cursor = (pos.x < shape.x + shape.width/2)?
									"url(\"./images/cursors/resize-left.png\"), w-resize":
									"url(\"./images/cursors/resize-right.png\"), e-resize";
							break select_cursor;
					}
				}
			}
			//default
			cursor = "url(\"./images/cursors/cursor.png\"), auto";
		}
		
		this.ctx.canvas.style.cursor = cursor;
	}