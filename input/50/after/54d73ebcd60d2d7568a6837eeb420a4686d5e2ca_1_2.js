function(observer, context) {
	        var ctx = context || null;
	        this._observers.push({ observer: observer, context: ctx });
	    }