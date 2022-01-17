function(ctx){
		cp.fill.call(this, ctx);
		if(!!this.image){
			var w = this.config.width, h = this.config.height;
			var x = w * -.5, y = h * -.5;
			ctx.drawImage(this.image, x, y, w, h);
		}
	}