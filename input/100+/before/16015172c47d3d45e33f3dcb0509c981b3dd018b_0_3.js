function(dx, dy){
	if(this.animate_idx === 2){
		this.d = -1;
	}else if(this.animate_idx === 0){
		this.d = 1;
	}
	if(frame % 5 === 0){
		this.animate_idx = (this.animate_idx + this.d);
	}
	this.x += dx * monsterInfo[this.name].speed;
	this.y += dy * monsterInfo[this.name].speed;
}