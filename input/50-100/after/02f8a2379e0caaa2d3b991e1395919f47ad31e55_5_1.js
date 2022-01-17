function(start, end, percentage){
		var x = Math.floor(start.x + percentage * (end.x - start.x));
		var y = Math.floor(start.y + percentage * (end.y - start.y));
	
		return {x:x, y:y};
	}