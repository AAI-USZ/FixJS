function(start, end, percentage){
		var x = start.x + percentage * (end.x - start.x);
		var y = start.y + percentage * (end.y - start.y);
	
		return {x:x, y:y};
	}