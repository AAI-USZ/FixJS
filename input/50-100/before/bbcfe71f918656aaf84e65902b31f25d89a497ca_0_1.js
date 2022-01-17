function(cid, cb)
	{
		this._showMessage('Getting Info...');
		
		var self = this;
        libDesigner.getConstructByID(cid, function(c)
        {
             self._con = c;
             self._hideMessage();
             if($.isFunction(cb)) cb(c);
        });
		return this;
	}