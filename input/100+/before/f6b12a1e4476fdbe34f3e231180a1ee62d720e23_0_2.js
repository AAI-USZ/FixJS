function(){
	var distanceX = this.path[this.path_progress][0] - this.position.x;
	var distanceY = this.path[this.path_progress][1] - this.position.y;
	if(distanceX < 10 && distanceX > -10 && distanceY < 10 && distanceY > -10){
		this.path_progress += 1;
		if(this.path_progress > (this.path.length - 1)){
			this.path_progress = 0;
		}
	}else if(distanceX < 10 && distanceX > -10){
		this.AIxy = 'y';
	}else if(distanceY < 10 && distanceY > -10){
		this.AIxy = 'x';
	};
	if(this.AIxy === 'x'){
		if(distanceX > 0){
			this.faceEast();
		}else{
			this.faceWest();
		};
	}else{
		if(distanceY < 0){
			this.faceNorth();
		}else{
			this.faceSouth();
		};
	};	
	this.walk();
}