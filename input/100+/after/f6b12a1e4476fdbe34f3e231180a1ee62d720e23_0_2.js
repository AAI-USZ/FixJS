function(){
	var distanceX = this.path[this.path_progress][0] - this.position.x;
	var distanceY = this.path[this.path_progress][1] - this.position.y;
	if(distanceX < 2 && distanceX > -2 && distanceY < 2 && distanceY > -2){
		this.path_progress += 1;
		if(this.path_progress > (this.path.length - 1)){
			this.path_progress = 0;
		}
	}else if(distanceX < 2 && distanceX > -2){
		this.AIxy = 'y';
	}else if(distanceY < 2 && distanceY > -2){
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