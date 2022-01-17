function(canvas,ctx){

		ctx.fillStyle="#dddddd";

		ctx.fillRect(t.x, t.y+t.height+2, t.width, 4);



		ctx.fillStyle="#ff0000";

		ctx.fillRect(t.x, t.y+t.height+2, Math.floor(t.width*t.hp/t.maxhp), 4);

	}