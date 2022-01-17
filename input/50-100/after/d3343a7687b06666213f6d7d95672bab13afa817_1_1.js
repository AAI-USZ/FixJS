function(string){
		this.q[string] = {
			start: false,
			stop: false,
			diff: false
		};
		rec = this.q[string];
		var now = new Date();
		rec.start = now.getTime();
		console.log('starting ' + string);
	}