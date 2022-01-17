function(dx, dy){
	if(this.animate_idx === 2){
		this.d = -1;
	}else if(this.animate_idx === 0){
		this.d = 1;
	}
	if(frame % 5 === 0){
		this.animate_idx = (this.animate_idx + this.d);
	}
	var mc = this.centre();
	var cc = character.centre();
	var distanceToCharacter = Math.sqrt(Math.pow((cc.x -mc.x), 2) + Math.pow((cc.y - mc.y), 2)) - 40;
	this.x += dx * Math.min(distanceToCharacter, monsterInfo[this.name].speed);
	this.y += dy * Math.min(distanceToCharacter, monsterInfo[this.name].speed);
    if(DEBUG && frame%30 === 0){
                 console.log(distanceToCharacter);
                 console.log('%s: %s, %s', this.name, this.x, this.y);
    }
	if (distanceToCharacter < this.speed){
	    console.log('Collision with %s', this.name);
    }
}