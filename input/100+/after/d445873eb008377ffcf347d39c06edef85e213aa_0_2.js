function(){

	this.lens = {x: parseInt(this.width/2), y: parseInt(this.height/2)};

	this.copyToClipboard();
	this.alpha = new Array(this.width*this.height);
	this.predictedimage = new Array(this.width*this.height);

	var theta_e = 100;
	
	for(var i = 0 ; i < this.width*this.height ; i++){
		var x = i % this.width - this.lens.x;
		var y = Math.floor(i/this.width) - this.lens.y;
		var r = Math.sqrt(x*x+y*y);
		var cosphi = x/r;
		var sinphi = y/r;
		
		this.alpha[i] = { x: theta_e*cosphi, y: theta_e*sinphi };
	}

	return this;
}