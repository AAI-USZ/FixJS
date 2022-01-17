function(funcName, func, info) {
		var x = info.func[funcName] = func;
		x.filename = info.filename;
		x.source = info.source;
	}