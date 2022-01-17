function(evt, data){
		var fns = this.events[evt];
		fns && fns.forEach(function(cb){ cb.call(this,data); });
	}