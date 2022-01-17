function() {
		this.renderBackground();

		// For each element list
		var sx = this.slider.x;
		var sw = this.slider.width;
		var i,track;
		for(i=0;track=this.tracks[i];i++) {
			// Make some adjustments before rendering if the track is a karaoke one
			if(this.tracks[i].karaoke) {
				if(this.selectedSegment == null || this.tracks[this.selectedSegment.track].karaoke)
					continue;
				else {
	
					//alert(this.tracks[this.selectedSegment.track].karaoke);
					//alert("Rendering a karaoke tag: " + this.selectedSegment.text);

					var start = this.selectedSegment.startTime/this.length;
					var end = this.selectedSegment.endTime/this.length;
					
					start = Math.round(this.view.width * start);
					end = Math.round(this.view.width * end) - start;
					
					this.slider.x = start - 0.5;
					this.slider.width = end;
					//this.view.zoom = timeFunctions.computeZoom(this.selectedSegment.endTime - this.selectedSegment.startTime, this.view.width - this.slider.width);

				}
			}else{
				this.slider.x = sx;
				this.slider.width = sw;
			}
			// Draw the elements
			track.render();
		}
		
		//right now just placeholder segments
		this.misc.forEach(function(el){el.render();});
		
		// Draw the slider
		this.slider.x = sx;
		this.slider.width = sw;
		this.slider.render();

		// Draw the key
		this.renderKey();
		
		// Draw the time marker
		this.renderTimeMarker();
		
		// Draw the AB repeat markers
		this.renderABRepeat();
	}