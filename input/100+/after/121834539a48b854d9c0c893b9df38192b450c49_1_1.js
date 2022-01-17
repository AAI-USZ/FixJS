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
		//Append .blade for filenames without an extension
		if(filename.split("/").pop().indexOf(".") < 0)
			filename += ".blade";
		//Now, load the template
		if(runtime.client)
		{
			filename = runtime.resolve(filename);
			if(cachedViews[filename])
			{
				cb(null, cachedViews[filename]);
				return true;
			}
			var blade = window.blade;
			//If the file is already loading...
			if(blade.cb[filename])
				blade.cb[filename].cb.push(cb); //push to the array of callbacks
			else
			{
				//Otherwise, start loading it by creating a script tag
				var st = document.createElement('script');
				st.type = 'text/javascript'; //use text/javascript because of IE
				st.async = true;
				st.src = blade.mount + filename;
				//Add compile options to the query string of the URL, if given
				//(this functionality is disabled for now since the middleware ignores it anyway)
				/*if(compileOptions)
				{
					var opts = "";
					for(var key in compileOptions)
						opts += "&" + key + "=" + encodeURIComponent(compileOptions[key]);
					st.src += "?" + opts.substr(1);
				}*/
				/* Helper function for runtime.loadTemplate that calls all of the callbacks
					in the specified array
					- cbArray contains all of the callbacks that need to be called
					- err is the error to be passed to the callbacks
				*/
				function callCallbacks(cbArray, err) {
					//call all callbacks
					for(var i = 0; i < cbArray.length; i++)
					{
						if(err)
							cbArray[i](err);
						else
							cbArray[i](null, cachedViews[filename]);
					}
				}
				//Set a timer to return an Error after a timeout expires.
				var timer = setTimeout(function() {
					var cb = blade.cb[filename].cb; //array of callbacks
					delete blade.cb[filename];
					st.parentNode.removeChild(st);
					callCallbacks(cb, new Error("Timeout Error: Blade Template [" + filename +
						"] could not be loaded.") );
				}, blade.timeout);
				var tmp = blade.cb[filename] = function(dependencies, unknownDependencies) {
					clearTimeout(timer);
					delete blade.cb[filename];
					st.parentNode.removeChild(st);
					//Load all dependencies, too
					if(dependencies.length > 0)
					{
						var done = 0;
						for(var i = 0; i < dependencies.length; i++)
							runtime.loadTemplate(baseDir, dependencies[i], compileOptions, function(err, tmpl) {
								if(err) return callCallbacks(tmp.cb, err);
								if(++done == dependencies.length)
									callCallbacks(tmp.cb);
							});
					}
					else
						callCallbacks(tmp.cb);
				};
				tmp.cb = [cb];
				//Insert script tag into the DOM
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(st, s);
			}
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