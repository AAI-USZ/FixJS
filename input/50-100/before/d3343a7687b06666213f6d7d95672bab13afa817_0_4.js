function(x,y,rad){
		var length = Math.sqrt((x * x) + (y * y));
		var currentRad = Math.atan2(x,y);
		x = Math.sin(currentRad - rad) * length;
		y = Math.cos(currentRad - rad) * length;
		var output = [x,y];
		return output;
	}