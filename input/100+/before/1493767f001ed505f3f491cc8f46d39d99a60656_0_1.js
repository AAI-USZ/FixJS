function(
			name,    // [required] String
			success, // [optional] Function()
			error,   // [optional] Function()
			scope)   // [optional] Object
		{
			var isError = false;
			var callback = function()
			{
				var f = isError ? error : success;
				if (f)
					f.apply(scope || this, arguments);
			}
			
			var pack = getPackage(name);
			if (pack.status === STATUS_PREPARING)
				throw new Error('Dependency loop detected while loading "' + name + '" package');
			
			if (pack.status === STATUS_LOADING)
			{
				pack.callbacks.push(callback);
				return;
			}
			
			if (pack.status === STATUS_LOADED)
			{
				setTimeout(callback, 1);
				return;
			}
			
			var loadInfo = pack.loadInfo;
			if (!loadInfo)
				throw new Error('Package "' + name + '" does not have loading info. Add it to "loaders" list of dependent package configuration');
			
			pack.status = STATUS_PREPARING;
			
			var requires = loadInfo.requires || [];
			for (var i = 0, l = requires.length; i < l; ++i)
				JWSDK.loadPackage(requires[i]);
			
			pack.status = STATUS_LOADING;
			pack.callbacks = [];
			pack.callbacks.push(callback);
			
			var css = loadInfo.css || [];
			var js  = loadInfo.js  || [];
			
			var pendingFiles = css.length + js.length;
			
			function onFileLoaded()
			{
				if (--pendingFiles)
					return;
				
				var callbacks = pack.callbacks.concat();
				for (var i = 0, l = callbacks.length; i < l; ++i)
					callbacks[i]();
			}
			
			function onFileError()
			{
				isError = true;
				onFileLoaded();
			}
			
			for (var i = 0, l = css.length; i < l; ++i)
				attachCss(css[i], onFileLoaded, onFileError);
			
			for (var i = 0, l = js.length; i < l; ++i)
				attachJs(js[i], onFileLoaded, onFileError);
		}