function callListener(listener){
		var af = listener.apply(undefined, args)
		if(af) afterCallbacks.push(af)
	}