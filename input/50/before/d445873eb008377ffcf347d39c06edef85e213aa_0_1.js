function(){
			// Call any callback functions
			if(typeof fnCallback=="function") fnCallback(_obj);
			_obj.trigger("load");
		}