function mainloop(){
		var ctx = stage.context;

		for(var i=0; i<movingBmps.length; ++i){
			if(Math.abs(movingBmps[i].tx - movingBmps[i].x) < 0.3 && Math.abs(movingBmps[i].ty - movingBmps[i].y) < 0.3){
				movingBmps[i].tx = Math.random()*500*Math.random();
				movingBmps[i].ty = Math.random()*300*Math.random();
			}
			else{
				movingBmps[i].x += (movingBmps[i].tx - movingBmps[i].x)/movingBmps[i].dm;
				movingBmps[i].y += (movingBmps[i].ty - movingBmps[i].y)/movingBmps[i].dm;
			}
			movingBmps[i].radian += movingBmps[i].dr;
		}

		bmp.radian += 0.2;

		stage.draw();

		// for(var i=0; i<movingBmps.length; ++i){
		// 	ctx.save();                  // Save the current state
		// 	ctx.fillStyle = '#00FFFF'       // Make changes to the settings
		// 	ctx.globalAlpha = 0.3;
		// 	aabb = movingBmps[i].aabb;
		// 	ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// 	ctx.restore();
		// }

		
		// ctx.setTransform(1, 0, 0, 1, 0, 0);
		// ctx.save();                  // Save the current state  
		// ctx.fillStyle = '#FF0000'       // Make changes to the settings 
		// ctx.globalAlpha = 0.5;
		// var aabb = container.aabb;
		// ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// ctx.restore();

		// ctx.save();                  // Save the current state  
		// ctx.fillStyle = '#00FF00'       // Make changes to the settings 
		// ctx.globalAlpha = 0.3;
		// aabb = bmp.aabb;
		// ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// ctx.restore();

		// console.log(bmp.aabb)
	}