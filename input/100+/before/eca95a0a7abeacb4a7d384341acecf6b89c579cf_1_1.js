function loop(iterated, callback, scope) {
			var i, 
				length;
			
			if (iterated instanceof Object && typeof callback == "function") {
				length = iterated.length;
				if (length) {
					for (i=0; i<length; i++) {
						callback.call(scope, iterated[i], i, iterated);
					}
				} else {
					for (i in iterated) {
						if (iterated.hasOwnProperty(i)) {
							callback.call(scope, iterated[i], i, iterated);
						}
					}
				}
				return true;
			} else {
				return false;
			}
		}