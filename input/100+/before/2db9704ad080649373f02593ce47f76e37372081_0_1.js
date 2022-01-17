function compileFile(filename, opts, cb) {
	if(typeof opts == "function")
		cb = opts, opts = {};
	//make shallow copy of opts and add `filename` property
	var options = {"filename": path.resolve(filename)};
	for(var i in opts)
		options[i] = opts[i];
	//Check cache first
	if(options.cache && cache[options.filename])
		cb(null, cache[options.filename]);
	else if(options.synchronous)
	{
		try {
			var data = fs.readFileSync(filename);
		} catch(err) {return cb(err);}
		compile(data.toString(), options, cb);
	}
	else
		fs.readFile(filename, function(err, data) {
			if(err) return cb(err);
			compile(data.toString(), options, cb);
		});
}