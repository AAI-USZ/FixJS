function(ctx){
		cp.fill.call(this, ctx);
		if(!!this.image){
			var w = this.config.width, h = this.config.height;
			var x = w * -.5, y = h * -.5;
			if(!this.config.imageCoord){
				ctx.drawImage(this.image, x, y, w, h);
			} else {
				var ic = this.config.imageCoord;
				var _x = ic.offsetX || 0, _y = ic.offsetY || 0;
				ctx.drawImage(this.image
					, ic.x, ic.y, ic.width, ic.height
					, x + _x, y + _y, w - _x * 2, h - _y * 2
					);
			}
		}
	}