function timeToPixels(date, limit) {
	
		limit = limit || g.zeroTime;
	
		var time = ( date.valueOf() - limit.valueOf() ) / g.MILLISECONDS_IN_HOUR; // hours
		var pixels = Math.floor(time * g.HOUR_WIDTH); // pixels
	
		return pixels;
	
	}