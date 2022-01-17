function (v, opts) {
		    	if (opts && opts.adbs)
		    		// called from zul.wgt.ADBS.autodisable
		    		this._adbs = true;	// Start autodisabling  
		    	else if (!opts || opts.adbs === undefined)
		    		// called somewhere else (including server-side)
		    		this._adbs = false;	// Stop autodisabling
		    	if (!v) {
		    		if (this._adbs)
		    			// autodisable is still active, enable allowed
		    			this._adbs = false;
		    		else if (opts && opts.adbs === false)
		    			// ignore re-enable by autodisable mechanism
		    			return this._disabled;
		    	}
		    	return v;
			}