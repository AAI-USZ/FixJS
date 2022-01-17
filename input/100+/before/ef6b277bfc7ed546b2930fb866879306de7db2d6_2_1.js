function(baseDir, filename, compileOptions, cb) {
		//Reorganize arguments
		if(typeof compileOptions == "function")
		{
			cb = compileOptions;
			if(typeof filename == "object")
				compileOptions = filename, filename = baseDir, baseDir = "";
			else
				compileOptions = null;
		}
		if(typeof filename == "function")
			cb = filename, filename = baseDir, compileOptions = null, baseDir = "";
		//Arguments are now in the right place
		if(runtime.client)
		{
			filename = runtime.resolve(filename);
			if(cachedViews[filename])
			{
				cb(null, cachedViews[filename]);
				return true;
			}
			var blade = window.blade;
			if(blade.cb[filename])
				throw new Error("Template is already loading. Be patient.");
			//Create script tag
			var st = document.createElement('script');
			st.type = 'text/javascript';
			st.async = true;
			st.src = blade.mount + filename;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(st, s);
			//Set a timer to throw an Error after a timeout expires.
			var timer = setTimeout(function() {
				delete blade.cb[filename];
				st.parentNode.removeChild(st);
				cb(new Error("Timeout Error: Blade Template [" + filename +
					"] could not be loaded.") );
			}, 15000);
			//Setup callback to be called by the template script
			blade.cb[filename] = function(dependencies, unknownDependencies) {
				clearTimeout(timer);
				delete blade.cb[filename];
				st.parentNode.removeChild(st);
				//Load all dependencies, too
				if(dependencies.length > 0)
				{
					var done = 0;
					for(var i = 0; i < dependencies.length; i++)
						runtime.loadTemplate(baseDir, dependencies[i], compileOptions, function(err, tmpl) {
							if(err) throw err;
							if(++done == dependencies.length)
								cb(null, cachedViews[filename]);
						});
				}
				else
					cb(null, cachedViews[filename]);
			};
			return false;
		}
		else
		{
			compileOptions.synchronous = true;
			require('./blade').compileFile(baseDir + "/" + filename,
				compileOptions, function(err, wrapper) {
					if(err) return cb(err);
					cb(null, wrapper.template);
				}
			);
			return true;
		}
	}