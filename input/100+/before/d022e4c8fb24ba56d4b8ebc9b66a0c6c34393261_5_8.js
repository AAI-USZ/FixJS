function() {
		var i, grd, top;
		// Erase everything
		this.ctx.clearRect(0, 0, this.view.width, this.height);

		// Draw the backround color
		grd = this.ctx.createLinearGradient(0,0,0,this.height);
		grd.addColorStop(0,this.backgroundColorBottom);
		grd.addColorStop(0.5,this.backgroundColorTop);
		grd.addColorStop(1,this.backgroundColorBottom);
		this.ctx.fillStyle = grd;
		this.ctx.fillRect(0, 0, this.view.width, this.height);

		// Draw the tracks
		//this.ctx.fillStyle = this.trackColor;
	//                var grd = this.ctx.createLinearGradient(0,0,0,this.segmentTrackHeight);
	//                grd.addColorStop(0,this.trackColorTop);
	//                grd.addColorStop(1,this.trackColorBottom);
	//                this.ctx.fillStyle = grd;
	/*	
		for(i = this.tracks.length-1; i >= 0; i--) {
			top = this.getTrackTop(i);
			//this.ctx.fillRect(0, top, this.view.width, this.segmentTrackHeight);
			this.ctx.drawImage(this.trackBg, 0, top, this.view.width, this.segmentTrackHeight);
		}
	*/
	}