function(pos) {
		if(pos == undefined)
			return;
		var i,j,track,seg,shape,cursor = "";
		
		// Check the slider
		if(this.slider.containsPoint({x: this.slider.x, y: pos.y})) {
			cursor = "url(\"./images/cursors/cursor.png\"), auto";
		}else if(pos.y < this.keyHeight) { // Check the key
			cursor = "url(\"./images/cursors/skip.png\"), auto";
		}else
		select_cursor: {
			// Are we on a subtitle
			for(i=0;track=this.tracks[i];i++) {
				if(track instanceof segmentTrack){
					for(j=0;seg=track.segments[j];j++) {
						if(seg.containsPoint(pos) && !seg.deleted) {
							shape = seg.getShape();
							switch(buttonController.currentTool){
								case 1: // Select
									cursor = "url(\"./images/cursors/cursor-highlight.png\"), auto";
									break select_cursor;
								case 2: // Move
									//cursor = "url(\"./images/cursors/move.png\"), auto";
									cursor = "move";
									break select_cursor;
								case 3: // Move
									cursor = "url(\"./images/cursors/cursor.png\"), auto";
									break select_cursor;
								case  4: // delete
									//cursor = "url(\"./images/cursors/delete.png\"), auto";
									cursor = "pointer";
									break select_cursor;
								case  5: // Resize
									if(pos.x < shape.x + shape.width/2){
										//cursor = "url(\"./images/cursors/resize-left.png\"), auto";
										cursor = "w-resize";
									}
									break select_cursor;
								default:
									//cursor = "url(\"./images/cursors/resize-right.png\"), auto";
									cursor = "e-resize";
									break select_cursor;
							}
						}
					}
				}
			}
			
			switch(buttonController.currentTool){
				case 3: // add
					cursor = "url(\"./images/cursors/add.png\"), auto";
					break;
				case 6:
					cursor = (this.repeatA != null && this.abRepeatOn == false)?
							"url(\"./images/cursors/repeat-b.png\"), auto":
							"url(\"./images/cursors/repeat-a.png\"), auto";
					break;
				default:
					cursor = "url(\"./images/cursors/cursor.png\"), auto";
			}
		}
		
		this.ctx.canvas.style.cursor = cursor;
	}