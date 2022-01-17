function Animation( element, properties, units, duration, rate, transition, cb ){
	// record the start time
	var startTime = new Date();
	
	// obtain starting and differential values
	var style = element.style,
		start = {},
		diff = {};
	for( prop in properties ){
		// regex to extract numbers
		start[prop] = Number(/-?\d+(\.\d+)?/.exec(style[prop]));
		diff[prop] = properties[prop] - start[prop];
	}
	
	// animation tick
	var timer = window.setInterval( function(){
		// determine the animation progress
		var time = new Date() - startTime;
		var progress = transition( Math.min( time / duration, 1 ) );
		// set property values
		for( prop in properties )
			style[prop] = (diff[prop] * progress + start[prop]) + units[prop];
		if( time >= duration ){
			// clear timer and callback
			window.clearInterval(timer);
			cb && cb();
		}
	}, rate );
}