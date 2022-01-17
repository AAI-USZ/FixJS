function compileFile(filename, options, cb) {
	if(typeof options == "function")
		cb = options, options = {};
	options.filename = path.resolve(filename);
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