function(listener) {
    		return function(ev) {
    			return listener.handleEvent.apply(listener, [ev.originalEvent]);
    		}
    	}