function (data)
	    {
	        for (var i in this._observers)
	        {
	            var item = this._observers[i];
	            item.observer.call(item.context, data);
	        }
	    }