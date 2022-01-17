function(ctx, debug){
		ctx.drawImage(this.g, this.sx, this.sy, this.w, this.h, this.x, this.y, this.w, this.h);
		if (debug){
		    console.log('drawing tile at %s, %s, you are at %s, %s', this.x, this.y, character.x, character.y);
		    ctx.strokeStyle = 'green';
		    ctx.strokeRect(this.x, this.y, this.w, this.h);
	    }
	}