function(funcName, idClass, info) {
		//Get remaining arguments to be passed to the function
		var func = info.func[funcName],
			args = [info];
		for(var i = 3; i < arguments.length; i++)
			args[i-2] = arguments[i];
		var oldFilename = info.filename,
			oldSource = info.source;
		info.filename = func.filename;
		info.source = func.source;
		func.apply(idClass, args); //Call the function
		info.filename = oldFilename;
		info.source = oldSource;
	}