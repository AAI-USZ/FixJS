function(x, y, dur, m, callback, delay){
		var f = _twe[m || 'quad_out'];
		var X = this.config.x;
		var Y = this.config.y;
		var dx = x - X;
		var dy = y - Y;
		var step = _ani.S(dur);
		var _ = this;
		_ani.reg(function(c){
			_.moveTo(f(c, X, dx, step), f(c, Y, dy, step));
			if(c >= step){
				_.moveTo(x, y);
				if(typeof callback === 'function'){
					if(delay && delay > 0){
						var st = setTimeout(function(){
							clearTimeout(st);
							st = null;
							callback.call(_, _);
						}, delay)
					} else {
						callback.call(_, _);
					}
				}
				return true;
			}
		});
	}