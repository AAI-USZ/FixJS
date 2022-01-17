function(){
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
	}