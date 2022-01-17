function Slider(tl) {
		var x = 0,
			width = tl.sliderHandleWidth*3;
		this.tl = tl;
		this.active = false;
		this.resizeSide = 0;

		Object.defineProperties(this, {
			width: {
				get: function(){ return width; },
				set: function(val){
					width = Math.min(Math.max(val, tl.sliderHandleWidth*3), tl.width - x);//, 1800*tl.width/tl.length);
					return width;
				}
			},
			x: {
				get: function(){ return x; },
				set: function(val){ return x = Math.min(tl.width-width, Math.max(0,val)); }
			},
			startx: {
				get: function(){ return x; },
				set: function(val){
					var nx = Math.min(tl.width-width, Math.max(0,val));
					width = Math.min(Math.max(width + x - nx, tl.sliderHandleWidth*3), tl.width - x);
					return x = nx;
				},
				enumerable: true
			},
			endx: {
				get: function(){ return x+width; },
				set: function(val){
					width = Math.min(Math.max(val - x, tl.sliderHandleWidth*3), tl.width - x);//, 1800*tl.view.width/tl.length);
					return x + width;
				},enumerable: true
			}
		});
		
		this.startingX = 0;
		this.startingWidth = 0;
	}