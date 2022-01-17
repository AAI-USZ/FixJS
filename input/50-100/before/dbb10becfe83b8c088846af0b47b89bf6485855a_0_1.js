function useThread(threadName, method, args){
		if (typeof threadName == "string") {
			Array.prototype.shift.apply(args);
		} else {
			threadName = '';
		}
		return method.apply(TIMING_THREADS[threadName] = (TIMING_THREADS[threadName] || jQuery('<div>').text(threadName)), args);
	}