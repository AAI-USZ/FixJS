function(){
	XM.ScriptLoader = {
		
		/**
		 * Configuration for XM.ScriptLoader
		 */
		config: {
			basePath: 'src',
			useAsynchronous: true,
			useCache: false
		},
		
		events: {},
		
		/**
		 * Store the list of dependency object. Each dependency object contain the following format:
		 * <pre>{
		 *    require: [],             //array of class dependencies..
		 *    callback: function() {}, //callback function to execute when all specified classes is loaded..
		 *    scope: {}                //execution scope of the said dependencies..
		 * }
		 * </pre>
		 * @private
		 */
		_queue: [],
		
		_isScriptLoaded: {},
		
		_namespaceToURLMap: {},
		
		_classMap: [],

		numLoadedFiles: 0,

		numWaitingFiles: 0,
		
		
		PROGRESS  : "progress",
		COMPLETE  : "complete",
		ERROR     : "error",
		
		/**
		 * Load a script file.
		 * @method
		 * @static
		 * @param {String}    url             The url of script to load.
		 * @param {Function}  onLoad          Callback function that will be executed when the loading process is complete.
		 * @param {Object}    scope           The execution scope (reference for "this" keyword) of {onLoad} function.
		 * @param {Boolean}   isSynchronous   Mark the current loading process as synchronous or asynchronous. Synchronous loading will make the queue wait until the current file is loaded before continuing the loading process. Asynchronous will load all file simultaneously.
		 * @private
		 */
		_load: function(url, onLoad, scope, isSynchronous) {
			var fileName  = url.split('/').pop(),
			    script,
			    isLoaded  = false,
			    noCache   = '?nocache=' + Number(new Date());
			    onLoadFn = function() {
					if (!isLoaded) {
						isLoaded = true;
						onLoad.call(scope);
					}
				};
			
			if (!isSynchronous) { //asynchronous
				script = document.createElement('script'),
				head = document.head || document.getElementsByTagName('head')[0];

				script.type = 'text/javascript';
				script.src = url + noCache;
				script.onload = onLoadFn;
				script.onreadystatechange = function() {
						if (this.readyState == 'loaded' || this.readyState == 'complete') {
								onLoadFn();
						}
				};

				head.appendChild(script);
			}
			else { //synchronous
				var xhr, status;

				if (window.XMLHttpRequest) {
						xhr = new XMLHttpRequest();
				} else {
						xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}

				if (xhr) {
					xhr.open('GET', url + noCache, false);
					xhr.send(null);

					status = (xhr.status == 1223) ? 204 : xhr.status;

					if (status >= 200 && status < 300) {
						new Function(xhr.responseText + "\n//@ sourceURL="+fileName)();
						onLoadFn();
					}
					else {
						console.log("Cannot load ", url, "error code", code);
					}
				}
			}
			
			return script;
		}, //end of XM.ScriptLoader#_load()
		
		/**
		 * Refresh all items in the queue. If all dependencies for an item exist during looping,
		 * it will execute the callback and call _refreshQueue() again. Triggers onReady when the queue is empty.
		 * @private
		 */
		_refreshQueue: function() {
				var i, j, item, reqs,
						ln = this._queue.length;

				if (ln === 0) {
					//this.triggerReady();
					console.log("UDA READY BANGET");
					return;
				}

				for (i = 0; i < ln; i++) {
					item = this._queue[i];
					if (item) {
						reqs = item.requires;
						if (reqs.length > this.numLoadedFiles) {
							continue;
						}

						j = 0;

						do {
							if (XM.ClassManager.isExist(reqs[j])) {
								XM.Array.erase(reqs, j, 1);
							}
							else {
								j++;
							}
						} while ( j < reqs.length);

						if (item.requires.length === 0) {
							XM.Array.erase(this._queue, j, 1);
							item.callback.call(item.scope);
							this._refreshQueue();
							break;
						}
					}
				}
		},
		
		/**
		 * Figure if the given string is a valid namespace format.
		 *
		 * @param   {String}  value   The string to be validate.
		 * @return  {Boolean} return true if given URL is a valid namespace format. Otherwise, return false.
		 */
		_isNamespace: function(value) {
			return (value.indexOf('/') > -1) ? false : true;
		},
		
		/**
		 * Translates a {namespace} to a valid URL to be used. Will convert '.' to '/'
		 *
		 * For example:
		 *   ("XM.canvas.CanvasFactory" => "js/XM/canvas/CanvasFactory.js")
		 *
		 * @param {String} className  The namespace string of the class (e.g: 'XM.canvas.CanvasFactory')
		 * @param {String} prefixPath (Optional) If supplied, will override the configuration prefix path defined in XM.Loader.config
		 * @return {String}  The valid URL of specified namespace
		 * @private
		 */
		_namespaceToURL: function(namespace, prefixPath) {
			var prefix = (XM.isString(prefixPath) ? prefixPath : this.config.basePath),
					path = "",
					endlength = namespace.indexOf(".min.js"),
					postfix = endlength > 0 ? ".min.js" : ".js";

			namespace = namespace.substr(0, (endlength > 0) ? endlength : namespace.length );
			path = prefix + "/" + namespace.replace(/\./g, "/") + postfix;
			return path;
		},
		
		_addNamespaceToURLMap: function(ns) {
			if (this._isNamespace(ns)) {
				this._namespaceToURLMap[ns] = this._namespaceToURL(ns);
			}
			else {
				this._namespaceToURLMap[ns] = this.config.basePath + "/" + ns;
			}
		},
		
		/**
		 * Loads all specified classes and their direct dependencies. Can load external library, use slash '/' separator instead of dot '.' separator to load external library.
		 *
		 * Example:
		 * require(["com.someclass", "vendor/jquery.1.2.3.min.js"], onLoaded, this);
		 *
		 * @param {String|Array}  requiredClasses   Can either be a string or an array of string.
		 * @param {Function}      fn                (optional) The callback function to executed after the classes is loaded.
		 * @param {Object}        scope             (optional) The execution scope (i.e: "this" keyword) of the callback function.
		 */
		require: function(classes, fn, scope) {
			console.log("require", classes);
			//We want to accept multiple classes as dependencies.
			//So if the specified {classes} is a String, we will convert it into an Array.
			if (XM.isString(classes)) {
				classes = [classes];
			}
			
			fn = fn || null;
			scope = scope || XM.global;
			
			//filtering the classes so that only non-empty and non-redundant classes are collected
			classes = XM.Array.filter(classes, function(item) {return !XM.isEmpty(item);});
			classes = XM.Array.filter(classes, function(name) {
				return !XM.ClassManager.isExist(name);
			}, this);
			
			//refresh the queue if all the filtered required classes is not required anymore (i.e: already loaded).
			//act as recursive stopper for each require() call in every class..
			if (classes.length === 0) {
				if (XM.isFunction(fn)) fn.call(scope);
				else throw new Error(":: XM.ScriptLoader#require -- The provided callback is not a Function");
				return this;
			}
			
			this._queue.push({
				requires: classes,
				callback: fn,
				scope: scope
			});
			
			//start to load all required class that not yet listed by framework..
			for (var i = 0, len = classes.length; i < len; i++) {
				
				var cls = classes[i];
				
				if ( this._isScriptLoaded[cls] !== true ) {
					this._isScriptLoaded[cls] = true;
					
					this.numWaitingFiles++;
					if (!this._namespaceToURLMap[cls]) this._addNamespaceToURLMap(cls);
					this._load(this._namespaceToURLMap[cls], this.onFileLoaded, this, this.config.useAsynchronous);
				}
			}
		},

		onFileLoaded: function(className, filePath) {
			this.numLoadedFiles++;
			this.numWaitingFiles--;

			if (this.numWaitingFiles === 0) this._refreshQueue();
		}
	};
}