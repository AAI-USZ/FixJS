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
		}