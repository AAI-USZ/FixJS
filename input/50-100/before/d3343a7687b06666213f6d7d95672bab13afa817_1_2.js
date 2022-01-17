function(string){
		rec = this.q[string];
		var now = new Date();
		rec.stop = now.getTime();
		rec.diff = rec.stop - rec.start;
		console.log(string, rec.diff);
	}