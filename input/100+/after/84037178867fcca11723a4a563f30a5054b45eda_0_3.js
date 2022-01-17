function(ctx){
    var x = this.x - this.w/2, // x and y are the centre point
        y = this.y - this.h/2,
        w = this.w,
        h = this.h,
        sx = this.sx,
        sy = this.sy;
	if(this.animation === 'spellcast' && this.sy === 0){
	    
	}else{
		ctx.drawImage(Clothes[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(Clothes[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
	}
	if (DEBUG){
	    var radius = 24;
	    ctx.beginPath();
	    ctx.strokeStyle = 'green';
	    ctx.arc(this.x, this.y, radius, 0, Math.PI*2,true)
	    ctx.stroke();
        if(frame%30 === 0){
	        console.log('%s: %s, %s', this.name, this.x, this.y);
	    }
    }
    if(keys.space){
    	this.animation = this.attack;
    	if(this.animation === 'spellcast'){
    		this.maxsx = 448;
    	}else if(this.animation === 'slash'){
    		this.maxsx = 384;
    		for(var i = 0;i < this.collidingmonsters.length; i++){
    			if(sx === 320 && frame%5===0){
    				this.collidingmonsters[i].hurt(Math.floor(Math.random() * (this.damage[1] - this.damage[0] + 1)) + this.damage[0]);
    			}
    		}
    	}else if(this.animation === 'shoot'){
    		this.maxsx = 832;
    	}
    	if(this.attacked === false){
    		if(this.animation === 'spellcast'){
    			ctx.drawImage(this[this.animation + '_' + this.weapon], sx, sy, w, h, x+2, y+7, w, h);
    		}else{
    			ctx.drawImage(this[this.animation + '_' + this.weapon], sx, sy, w, h, x, y, w, h);
    		}
    		if((frame % 5 === 0)){
				sx = this.sx += 64;
			}
    	}else{
    		this.animation = 'walk';
    	}
    }else{
    	this.attacked = false;
    	this.animation = 'walk';
    	this.maxsx = 576;
    }
    if(this.animation === 'spellcast' && sy === 0){
    	ctx.drawImage(this[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(Clothes[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
    }
    if(this.animation === 'walk'){
    	if(move.up){
			this.sy = 0; // face sprite up
    		if (!world.findCollision(10, -this.speed +32)){
    			this.y -= this.speed;
	    	}
		}else if(move.left){
	    	this.sy = 64; // face sprite left
	    	if (!world.findCollision(-this.speed +10, 44)){
		   		this.x -= this.speed;
			}
		}else if(move.down){
	    	this.sy = 128; // face sprite down
	    	if (!world.findCollision(10, this.speed +45)){
		    	this.y += this.speed;
			}
		}else if(move.right){
			this.sy = 192;
	    	if(!world.findCollision(this.speed +20, 44)){
    			this.x += this.speed;
    		}
		}
		if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right) && this.animation === 'walk'){
			this.sx += 64;
		}
		if(!(move.up || move.left || move.down || move.right)){
			this.sx = 0;
		}
	}
	if(this.sx >= this.maxsx){
		this.sx = 64;
		if(this.animation === this.attack){
			this.attacked = true;
		}
	}
	this.collidingmonsters = [];
}