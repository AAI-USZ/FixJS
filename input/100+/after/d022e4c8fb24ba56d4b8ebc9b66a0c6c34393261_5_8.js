function() {
		var ctx = this.ctx,
			grd = ctx.createLinearGradient(0,0,0,this.height);
			
		// Erase everything
//		ctx.clearRect(0, 0, this.view.width, this.height);

		// Draw the backround color
		grd.addColorStop(0,this.backgroundColorBottom);
		grd.addColorStop(0.5,this.backgroundColorTop);
		grd.addColorStop(1,this.backgroundColorBottom);
		ctx.save();
		ctx.fillStyle = grd;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0, 0, this.view.width, this.height);
		ctx.restore();
	}