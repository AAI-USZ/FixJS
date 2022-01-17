function(evt, data){
		var fns = this.events[evt];
		if(fns){
			fns.forEach(function(cb){ cb.call(this,data); });
		}
	}