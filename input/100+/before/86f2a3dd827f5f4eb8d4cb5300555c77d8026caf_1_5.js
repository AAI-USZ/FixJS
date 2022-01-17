function mouseDown(ev) {
		var pos = {x: ev.offsetX || ev.layerX, y: ev.offsetY || ev.layerY},
			track,seg,i,j;

		this.mouseDownPos = pos;
		this.mousePos = pos;
		
		if(pos.y > this.height - this.sliderHeight - this.trackPadding){ // Check the slider
			if(this.slider.containsPoint(pos)) {
				this.slider.mouseDown(pos);
				this.sliderActive = true;
			}else if(this.currentTool == Timeline.SCROLL){
				initResize.call(this);
			}else{
				this.slider.middle = pos.x;
				this.render();
				if(pos.y > this.height - this.sliderHeight){
					this.slider.mouseDown(pos);
					this.sliderActive = true;
					this.canvas.style.cursor = this.cursors.move;
				}
			}
		}else if(pos.y < this.keyHeight+this.trackPadding) { // Check the key
			i = this.view.pixelToTime(pos.x);
			this.currentTime = i;
			this.emit('jump',i);
			this.emit('timeupdate',i);
		}else switch(this.currentTool){
			case Timeline.CREATE:
				track = this.trackFromPos(pos);
				if(track && track.active && !track.locked){
					this.activeElement = new Timeline.Placeholder(this, track, pos.x);
				}
				break;
			case Timeline.REPEAT:
				if(this.abRepeatOn){ this.clearRepeat(); }
				else if(this.repeatA == null){ this.setA(pos); }
				else{ this.setB(pos); }
				break;
			case Timeline.SCROLL:
				initScroll.call(this);
			default:
				// Check all the segments
				track_loop: for(i=0;track=this.tracks[i];i++) {
					//search backwards 'cause later segments are on top
					for(j=track.visibleSegments.length-1;seg = track.visibleSegments[j];j--) {
						if(!seg.containsPoint(pos)) { continue; }
						this.activeElement = seg;
						seg.mouseDown(pos);
						break track_loop;
					}
				}
		}
		
		ev.preventDefault();
	}