function(req) {
	var i, j;
	var done = false;

	for (i = 0; i < this.requests.length && !done; ++i) {	
		if (this.requests[i]){			
			for (j = 0; j < this.requests[i].length; ++j) {
				if (this.requests[i][j] === req) {
					this.requests[i].splice(j, 1);
					done = true;
					break;
				}
			}
		}
	}
}