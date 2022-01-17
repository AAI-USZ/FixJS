function useThreadGroup(name, method, args){
		if (typeof name == "string") {
			Array.prototype.shift.apply(args);
		} else {
			name = '';
		}
		return method.apply(THREAD_GROUPS[name] = (THREAD_GROUPS[name] || jQuery('<div>').text(name)), args);
	}