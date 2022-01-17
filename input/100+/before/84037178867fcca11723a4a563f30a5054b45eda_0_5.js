function(dx, dy){
	
	if(this.animating){
		if(frame%5 === 0){
			this.spriteOffset.x += 64;
		}
		this.spriteOffset.y = this.direction*64;
		if((this.path[this.path_progress][0] - this.x) < 10 && (this.path[this.path_progress][0] - this.x) > -10 && (this.path[this.path_progress][1] - this.y) < 10 && (this.path[this.path_progress][1] - this.y) > -10){
			
		}
		this.x += dx*this.speed;
		this.y += dy*this.speed;
	}else{
		this.spriteOffset.x = 0;
	}
	if(this.spriteOffset.x >= this.maxsx){
		this.spriteOffset.x = 64;
	}
}