function(observer, context) {
	        for (var i in this._observers)
	            if ( this._observers[i].observer == observer &&
	                 this._observers[i].context == context )
	                    delete this._observers[i];
	    }