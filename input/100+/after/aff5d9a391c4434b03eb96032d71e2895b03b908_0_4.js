function(x, y, dur, m, callback, delay, predelay){
		var f = _twe[m || 'quad_out'];
		var X = this.config.scaleX;
		var Y = this.config.scaleY;
		var dx = x - X;
		var dy = y - Y;
		var step = _ani.S(dur);
		var _ = this;
		var fn = function(){_ani.reg(
			function(c){
				_.scale(f(c, X, dx, step), f(c, Y, dy, step));
				if(c >= step){
					_.scale(x, y);
					if(typeof callback === 'function'){
						if(delay && delay > 0){
							var st = setTimeout(function(){
								clearTimeout(st);
								st = null;
								callback(_);
							}, delay)
						} else {
							callback(_);
						}
					}
					return true;
				}
			});
		}
		predelay = predelay || 0;
		if(predelay > 0){
			setTimeout(fn, predelay);
		} else {
			fn();
		}
	}