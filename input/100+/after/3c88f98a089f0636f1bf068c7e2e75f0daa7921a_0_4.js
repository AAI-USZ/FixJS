function loadAndExecute(sync, callback) {
		// summary:
		//		Retreives a remote script and inject it either by XHR (sync) or attaching
		//		a script tag to the DOM (async). Once the resource is loaded, it will be
		//		executed.
		//
		// sync: Boolean
		//		If true, uses XHR, otherwise uses a script tag.
		//
		// callback: Function?
		//		A function to call when sync is false and the script tag loads and executes.

		var s,
			x,
			scriptTagLoadEvent,
			scriptTagErrorEvent,
			_t = this,
			name = _t.name,
			cached = defCache[name];

		function onLoad(rawDef) {
			_t.loaded = 1;
			// if rawDef is undefined, then we're loading async
			if (_t.rawDef = rawDef) {
				if (is(rawDef, "String")) {
					// if rawDef is a string, then it's either a cached string or xhr response.
					// the string could contain an AMD module or CommonJS module
					if (/\.js$/.test(_t.url)) {
						rawDef = evaluate(rawDef, _t.cjs);
						_t.def = _t.rawDef = !isEmpty(rawDef.exports) ? rawDef.exports : (rawDef.module && !isEmpty(rawDef.module.exports) ? rawDef.module.exports : null);
						_t.def === null && (_t.rawDef = rawDef);
					} else {
						_t.def = rawDef;
						_t.executed = 1;
					}
				} else if (is(rawDef, "Function")) {
					// if rawDef is a function, then it's a cached module definition
					waiting[name] = _t;
					rawDef();
				}
			}

			// we need to process the definition queue just in case the rawDef fired define()
			processDefQ(_t) || _t.execute();
		}

		function disconnect() {
			scriptTagLoadEvent && scriptTagLoadEvent();
			scriptTagErrorEvent && scriptTagErrorEvent();
		}

		function failed() {
			modules[name] = 0;
			delete waiting[name];
			disconnect();
		}

		(_t._postLoadExecutePromise || (_t._postLoadExecutePromise = new Promise)).then(callback);

		// if we don't have a url, then I suppose we're loaded
		if (_t.executed || !_t.url) {
			_t.loaded = 1;
			_t.execute();
			return;
		}

		// if we're already waiting, then we can just return and our callback will be fired
		if (waiting[name]) {
			return;
		}

		// if we're already loaded or the definition has been cached, then just return now
		if (_t.loaded || cached) {
			delete defCache[name];
			onLoad(cached);
		}

		// mark this module as waiting to be loaded so that anonymous modules can be
		// identified
		waiting[name] = _t;

		if (_t.sync = sync) {
			x = new XMLHttpRequest();
			x.open("GET", _t.url, false);
			x.send(null);

			if (x.status === 200) {
				onLoad(x.responseText);
			} else {
				failed();
				throw new Error("Failed to load module \"" + name + "\": " + x.status);
			}
		} else {
			// insert the script tag, attach onload, wait
			x = _t.node = doc.createElement("script");
			x.type = "text/javascript";
			x.charset = "utf-8";
			x.async = true;

			scriptTagLoadEvent = on(x, "load", function onScriptTagLoad(e) {
				e = e || global.event;
				var node = e.target || e.srcElement;
				if (e.type === "load" || /complete|loaded/.test(node.readyState)) {
					disconnect();
					onLoad();
				}
			});

			scriptTagErrorEvent = on(x, "error", failed);

			// set the source url last
			x.src = _t.url;

			s = doc.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(x, s);
		}
	}