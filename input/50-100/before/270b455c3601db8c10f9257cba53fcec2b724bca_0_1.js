function(){
		// determine the animation progress
		var time = new Date() - startTime;
		var progress = Math.min( transition( time / duration ), 1 );
		// set property values
		for( prop in properties )
			style[prop] = (diff[prop] * progress + start[prop]) + units[prop];
		if( progress === 1 ){
			// clear timer and callback
			window.clearInterval(timer);
			cb && cb();
		}
	}