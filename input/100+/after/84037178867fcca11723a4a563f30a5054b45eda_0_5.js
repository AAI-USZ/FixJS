function(dx, dy){
	
	if(this.animating){
		if(frame%5 === 0){
			this.sx += 64;
		}
		this.sy = this.direction*64;
		if((this.path[this.path_progress][0] - this.x) < 10 && (this.path[this.path_progress][0] - this.x) > -10 && (this.path[this.path_progress][1] - this.y) < 10 && (this.path[this.path_progress][1] - this.y) > -10){
			
		}
		this.x += dx*this.speed;
		this.y += dy*this.speed;
	}else{
		this.sx = 0;
	}
	if(this.sx >= this.maxsx){
		this.sx = 64;
	}
}