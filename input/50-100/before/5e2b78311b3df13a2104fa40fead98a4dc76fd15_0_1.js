function (name, handler) {
			// @cond debug if (!name || !name.toLowerCase) error("No name given or name not a string.");
			// @cond debug if (!handler || !handler['MEHL']) error("No handler given or handler invalid.");
			name = name.toLowerCase();
			handler = handler['MEHL'];
	    	return eachlist(function(el) {
				if (el.addEventListener)
					el.removeEventListener(name, handler, true); // W3C DOM
				else 
					el.detachEvent('on'+name, handler);  // IE < 9 version
	    	});
		}