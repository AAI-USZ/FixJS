function(f){
					f.apply(base, Array.prototype.slice.call(arguments, 1));
				}