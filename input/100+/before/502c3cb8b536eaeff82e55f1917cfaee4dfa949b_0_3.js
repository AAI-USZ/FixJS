function() {

	var Orange, Class, EventTarget, EventHandle, Events, Log, Loader, Ajax, Element, Cache, Storage, Socket, Location,
	
		__import = function(name) { return Orange[name] },
		__export = function(name, object) { return Orange[name] = object },
		__keyFilterRegex = /[^A-Za-z:0-9_\[\]]/g,
		__modFilterRegex = /[^-A-Za-z_]/g;
	
	function noop() {}
	
	function clone(o) {
		var newObj = (o instanceof Array) ? [] : {};
		for (i in o) {
		  if (i == 'clone') continue;
		  if (o[i] && typeof o[i] == "object") {
		    newObj[i] = clone(o[i]);
		  } else newObj[i] = o[i];
		} return newObj;
	}
	
	/**
	 * provides basic oop functionality including
	 * inheritance, and accessing super classes
	 */
	Class = (function() {
	
		var initializing = false, fnTest = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;
		
		Class.extend = function(def) {
		
			var _super = this.prototype;
	    initializing = true;
	    var prototype = new this();
	    initializing = false;
	    
	    for (var name in def) {
	      prototype[name] = typeof def[name] == "function" && typeof _super[name] == "function" && fnTest.test(def[name]) ? (function(name, fn) {
	        return function() {
	          var tmp = this._super;
	          this._super = _super[name];
	          var ret = fn.apply(this, arguments);        
	          this._super = tmp;
	          return ret;
	        };
	      })(name, def[name]) : def[name];
	    }
	    
	    function Class() {
				if (!initializing && this.initialize) {
					this.initialize.apply(this, arguments);
				}
	    }
	    
	    Class.prototype = prototype;
	    Class.prototype.constructor = Class;
	    Class.extend = arguments.callee;
	    
	    return Class;
		
		};
		
		Class.proxy = function(func, context) {
			var _this = context;
			return function() {
				return func.apply(_this, arguments);
			}
		};
		
		function Class() {}

		return Class;

	})();

	/**
	 * the returned event object passed to callback
	 * functions
	 */	
	EventTarget = (function() {	
	
		function EventTarget(type, currentTarget, target, data) {
			this.bubbles = true;
			this.type = type;
			this.currentTarget = currentTarget;
			this.target = target;
			this.data = data;
		}
		
		EventTarget.prototype.stopPropagation = function() {
			this.bubbles = false;
		};
	
		return EventTarget;
	
	})();
	
	/**
	 * the event handle returned on every event binding
	 * to maintain a reference for unbinding later
	 */
	EventHandle = (function() {
	
		function EventHandle(target, ev, call) {
			this.target = target;
			this.ev = ev;
			this.call = call;
		}
		
		EventHandle.prototype.detach = function() {
			this.target.detach(this.ev, this.call);
			delete this.target;
			delete this.ev;
			delete this.call;
			delete this;
		}
		
		return EventHandle;
	
	})();
	
	/**
	 * the event object to bind, fire, and unbind
	 * events on. this can be used in your other classes
	 * to give them even functionality
	 */
	Events = (function() {
	
		function Events(parent, self) {
			this._listeners = {};
			this._parent = parent;
			this._self = self;
		}
		
		Events.prototype.on = function(ev, call) {
			if (!this._listeners.hasOwnProperty(ev)) {
				this._listeners[ev] = [];
			}
			this._listeners[ev].push(call);	
			return new EventHandle(this, ev, call);
		};
		
		Events.prototype.fire = function(ev, data) {
			
			var parent = this._parent;
	
			if (typeof ev === 'string') ev = new EventTarget(ev, this._self, this._self, data);
			if (typeof ev.type !== 'string') throw "Error: Invalid 'type' when firing event";
			
			if (this._listeners[ev.type] instanceof Array) {
				var listeners = this._listeners[ev.type];
				for (var i = 0, len = listeners.length; i < len; i++) listeners[i].call(this, ev);
			}
			if (parent != null && parent._eventTarget instanceof EventTarget && ev.bubbles) {
				ev.currentTarget = this._parent;
				parent._eventTarget.fire.call(parent._eventTarget, ev, data);
			}
			
		};
		
		Events.prototype.detach = function(ev, call) {
		
			if (this._listeners[ev] instanceof Array) {
				var listeners = this._listeners[ev];
				for (var i = 0, len = listeners.length; i < len; i++) {
					if (typeof call !== 'undefined' && listeners[i] === call) {
						listeners.splice(i, 1);
						break;
					} else listeners.splice(i, 1);
				}
			} else if (typeof ev === 'undefined') {
				this._listeners = {};
			}
		
		};
		
		Events.prototype.destroy = function() {
			for(var listener in this._listeners) {
				listener.detach();
			}
			delete this._parent;
			delete this._self;
		};
	
		return Events;
	
	})();
	
	/**
	 * adds basic logging functionality on top
	 * of the console so that the application can
	 * bind to and listen for log messages.
	 * the log is exposed as a global variable.
	 */
	Log = (function() {
		
		var Log = {}, events = new Events(null, Log), level = 0;
		
		if (typeof(console) == "undefined") {
		  console = { log: function() {}, dir: function() {} };
		}
		
		var printLog = function(type, msg, ex) {
			if (ex) console.log(type, msg, ex);
			else console.log(type, msg);
		};
		
		Log.on = function(ev, call, context) {
			var context = context, proxy = function(e) {
				var message = e.data.message, ex = e.data.data;
				call.call(((typeof context !== 'undefined') ? context : this), message, ex);
			};
			return events.on.call(events, ev, proxy);
		};

		Log.fire = function() {
			return events.fire.apply(events, arguments);
		};
				
		Log.detach = function() {
			return events.detach.apply(events, arguments);
		};
		
		Log.setLevel = function(logLevel) {
			switch (logLevel.toLowerCase()) {
				case 'info':
					level = 4; break;
				case 'debug':
					level = 3; break;
				case 'warn':
					level = 2; break;
				case 'error':
					level = 1; break;
				default:
					level = 0;
			}
		};
		
		Log.info = function(msg, ex) { if (level > 3) Log.fire('info', { message: msg, data: ex }); };
		Log.debug = function(msg, ex) { if (level > 2) Log.fire('debug', { message: msg, data: ex }); };
		Log.warn = function(msg, ex) { if (level > 1) Log.fire('warn', { message: msg, data: ex }); };
		Log.error = function(msg, ex) { if (level > 0) Log.fire('error', { message: msg, data: ex }); };
		
		Log.on('info', function(msg, ex) { printLog('[INFO]', msg, ex); });
		Log.on('debug', function(msg, ex) { printLog('[DEBUG]', msg, ex); });
		Log.on('warn', function(msg, ex) { printLog('[WARN]', msg, ex); });
		Log.on('error', function(msg, ex) { printLog('[ERROR]', msg, ex); });
				
		return Log;
		
	})();
	
	/**
	 * the loader is used to manage all
	 * developer created modules outside the scope
	 * and namespace of the library
	 */
	Loader = (function() {
	
		var modules = {}, active = {};
	
		return {
		
			addModule: function(name, fn, req) {
				name = name.replace(/[^-A-Za-z_]/g);
				var mod = {
					name: name,
					fn: fn,
					req: (req != undefined) ? req : []
				};
				modules[name] = mod;
			},
			
			loadModule: function(name) {
				if (active.hasOwnProperty(name)) return;
				if (modules[name] != undefined) {				
					active[name] = true;											
					for(var i = 0, len = modules[name].req.length; i < len; i++) {
						if(modules[name].req[i] === name) continue;
						Loader.loadModule(modules[name].req[i]);
					}			
					modules[name].fn.call(window, Orange);				
					Log.debug('Module "' + name + '" loaded');
				}
			}
		
		};
	
	})();
	
	/**
	 * publically available loader function
	 * for adding modules
	 */
	var add = function() {
		var args = arguments,
			name = args[0],
			fn = ( typeof args[1] === 'function' ) ? args[1] : null,
			req = args[2];
		Loader.addModule(name, fn, req);	
	};
	
	/**
	 * publically available loader function
	 * for loading dependant modules
	 */
	var use = function() {
		var args = Array.prototype.slice.call(arguments),
			fn = args[args.length-1],
			req = clone(args).splice(0, args.length-1)										
		if(typeof req[0] != 'function') { 
			for (var i = 0, len = req.length; i < len; i++) {
				Loader.loadModule(req[i]);
			}
		}
		fn.call(window, Orange);	
	};
	
	/**
	 * sets the given namespace inside a module
	 */
	var namespace = function(name) {
		if(Orange[name] == undefined) {
			Orange[name] = {};
		}	
	};
	
	/**
	 * wrapper around ajax calls either using jQuery if
	 * available for defaulting to a limited functionality
	 * XMLHttpRequest otherwise.
	 */	
	Ajax = (function() {
	
		var XMLHttpRequests = [
			function() { return new XMLHttpRequest() },
			function() { return new ActiveXObject('Msxml2.XMLHTTP') },
			function() { return new ActiveXObject('Msxml3.XMLHTTP') },
			function() { return new ActiveXObject('Microsoft.XMLHTTP') }
		];
		
		var createXMLHttpObject = function() {
			var obj = false;
			for(var i = 0, length = XMLHttpRequests.length; i < length; i++) {
				try {
					obj = XMLHttpRequests[i]();
				} catch(e) {
					continue;
				}
			}
			return obj;
		};
		
		return {
		
			load: function(request) {
						
				if (typeof $ !== 'undefined') {
					return $.ajax(request).responseText;
				} 
				else {
					var req = createXMLHttpObject();
					if (!req) return;
									
					var success, error, data, done = false;
					
					if (typeof request.success === 'function') success = request.success;
					if (typeof request.error === 'function') error = request.error;
					if (request.hasOwnProperty('data')) data = encodeURIComponent(request.data);
					var method = request.hasOwnProperty('type') ? request.type : 'GET';
					var url = request.hasOwnProperty('type') ? request.url : null;

					req.open(method, url, true);
					req.setRequestHeader('Cache-Control', 'no-cache');
					req.timeout = 3000;
					req.ontimeout = function () { error(req); }
					
					req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					if (data) req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					req.onreadystatechange = function () {
						if (req.readyState != 4) return;
						if (req.status != 200 && req.status != 304) {
							error(req);
						}
						else success(req.responseText);
					}
					
					if (req.readyState == 4) {
						success(req); return;
					}
					
					req.send(data);
				}
				
			},
			
			get: function(request) {
				request.type = 'GET';
				return Ajax.load(request);
			},
			
			post: function(request) {
				request.type = 'POST';
				return Ajax.load(request);
			},
			
			put: function(request) {
				request.type = 'PUT';
				return Ajax.load(request);
			},
			
			del: function(request) {
				request.type = 'DELETE';
				return Ajax.load(request);
			}
		
		};
	
	})();
	
	/**
	 * internal wrapper for DOM element lookups using either jQuery 
	 * for defaulting to document.getElementById() providing
	 * event listener bindings
	 */
	Element = (function() {
		
		Element.bind = function(obj, evt, fn) {		
			if (obj.addEventListener) {
				obj.addEventListener(evt, fn, false);
			} else if (obj.attachEvent) {
				obj.attachEvent('on' + evt, fn);
			}
		};
		
		Element.unbind = function(obj, evt, fn) {		
			if (obj.removeEventListener) {
				obj.removeEventListener(evt, fn, false);
			} else if (obj.detachEvent) {
				obj.detachEvent('on' + evt, fn);
			}
		};
		
		Element.on = function() {
			Element.bind.apply(Element, arguments)
		};
		
		Element.off = function() {
			Element.bind.apply(Element, arguments)
		};
	
		function Element(selector) {
			if (typeof $ !== 'undefined') {
				this.target = $(selector);
				this.jQuery = true;
			}
			else this.target = document.getElementById(selector.replace('#', ''));
		}
		
		Element.prototype.bind = function(evt, fn) {
			Element.bind(this.target, evt, fn);
		};
		
		Element.prototype.unbind = function(evt, fn) {
			Element.unbind(this.target, evt, fn);
		};
		
		Element.prototype.on = function(evt, fn) {
			Element.on(this.target, evt, fn);
		};
		
		Element.prototype.off = function(evt, fn) {
			Element.off(this.target, evt, fn);
		};
		
		return Element;
		
	})();
	
	/**
	 * the cache wraps HTML5's new offline mode
	 * using the navigator.onLine propery. it falls
	 * back to polling when offline mode is not supported.
	 * 
	 */
	Cache = (function() {
		
		var active = null, poll = false,
				isOnline = false, isLoaded = false, isInit = false;
				
		var stop = function() {
			if(active != null) {
				clearTimeout(active);
				active = null;
			}
		};
		
		var events = new Events(null, Cache)
		
		var statusCallback = function() {

			if(navigator.onLine && !isLoaded) {
				isOnline = true;
				isLoaded = true;
				Cache.fire("statusChange", 1);
				return;
			}
			
			stop();
												
			active = setTimeout(function() {

				if (navigator.onLine && !isLoaded) {
					isOnline = true;
					isLoaded = true;
					Cache.fire("statusChange", 1);
				} else if (navigator.onLine) {
				  				  
				  Ajax.load({
				  	url: 'ping.js', 
				  	type: "GET",
				  	success: function(req) {
					  	if (isOnline === false) {
					  		isOnline = true;
					  		Cache.fire("statusChange", 1);
					  	}
					  	
					  },
					  error: function(req) {
					  	if (isOnline === true) {
					  		isOnline = false;
					  		Cache.fire("statusChange", 0);
					  	}	
					  }
				  });
				  		  				  
				} else {
					
					setTimeout(function() {
						if (isOnline === true) {
							isOnline = false;
							Cache.fire("statusChange", 0);
						}
					}, 100);
				
				}
				
				active = null;
				if (poll) setTimeout(statusCallback, 10 * 1000);			
				
			}, (isLoaded ? 100 : 0));
			
		};
		
		var onUpdateReady = function() {
			window.applicationCache.swapCache();
			Log.debug("Cache: Updated cache loaded and ready");
			window.location.reload(true);
		};
		
		return {
				
			on: function(ev, call, context) {
				var proxy = (typeof context !== 'undefined') ? function() { call.apply(context, arguments); } : call;
				return events.on.call(events, ev, proxy);
			},
			
			fire: function() {
				return events.fire.apply(events, arguments);
			},
			
			detach: function() {
				return events.detach.apply(events, arguments);
			},
				
			
			init: function(polling) {
			
				if (isInit) return;		
				poll = polling;
				isInit = true;
	
				Element.bind(window, "offline", statusCallback);
				Element.bind(window, "online", statusCallback);
				Element.bind(window, "updateready", onUpdateReady);
								
				statusCallback();
					
			},
			
			updateNetworkStatus: function(callback) {
				statusCallback();
			},
		
			isActive: function() {
				return isInit;
			},
			
			isOnline: function() {
				return isOnline;
			}
		
		}
	
	})();
	
	/**
	 * storage wraps HTML5 local storage adding
	 * expirations and support for older browsers
	 */
	Storage = (function() {
	
		var _localStorage = window.localStorage,
				isSupported = false, isOnline = false;
				
		if ("localStorage" in window) {
			try {
				window.localStorage.setItem('_test', 1);
				isSupported = true;
				window.localStorage.removeItem('_test');
			} catch (e) {} // iOS5 Private Browsing mode throws QUOTA_EXCEEDED_ERROR DOM Exception 22 via JStorage
		}
		
		if (isSupported) {
			try {
				if (window.localStorage) {
					_localStorage = window.localStorage;
				}
			} catch (e) {} // Firefox local storage bug when cookies are disabled via JStorage
		}
		else if ("globalStorage" in window) {
			try {
				if (window.globalStorage) {
			    _localStorage = window.globalStorage[window.location.hostname];
			    isSupported = true;
				}
			} catch(e) {}
		} else {} // TODO: add support for IE 6/7 userData
		
		if ((typeof JSON === "undefined" || JSON.stringify == undefined) && typeof $ === 'undefined') {
			isSupported = false;
		}

		if (!isSupported) Log.debug("localStorage not supported");	
				
	
		Storage.get = function(key) {
			
			if (!isSupported) return;
			try {
				var item = JSON.parse(_localStorage.getItem(key));
				if (item != undefined && item.data != undefined) {
					if (isOnline && item.ttl !== -1 && ((new Date()).getTime() - item.timestamp) > item.ttl) {
						_localStorage.removeItem(key);
					}
					return item.data; 
				}
			} catch(e) {
				Log.error("Error fetching object from localStorage");
			}
			
		};
		
		Storage.set = function(key, value, ttl) {
					
			if (!isSupported) return false;
			key = key.replace(__keyFilterRegex, '');
			if (typeof value === 'undefined') return false;
			
			var obj = {
				data: value,
				timestamp: (new Date()).getTime(),
				ttl: ttl ? ttl : (24 * 60 * 60 * 1000) // 24 hours
			};
			
			try {
				_localStorage.setItem(key, JSON.stringify(obj)); // store object
				return true;
			} catch (e) {
				if (e == QUOTA_EXCEEDED_ERR) {
					Log.error("Storage quota has been exceeded", e);
				}
			}
			return false;
		}
		
		Storage.remove = function(key) {
			if (!isSupported) return false;
			_localStorage.removeItem(key);
		};
		
		Storage.flushExpired = function(force) {
			if (!isSupported) return;			
			if (isOnline === false && force !== true) return;
			for (var key in _localStorage) {
				Storage.get(key);
			}
		};
		
		Storage.flush = function(force) {
			if (!isSupported) return;
			if (isOnline === false && force !== true) return;
			_localStorage.clear();
			Log.info("Clear: Local storage cleared");
		};
		
		Storage.isSupported = function() {
			return isSupported;
		};
	
		Storage.goOnline = function() {
			isOnline = true;
		};
		
		Storage.goOffline = function() {
			isOnline = false;
		};
	
		function Storage() {}
	
		return Storage;
	
	})();
	
	/**
	 * basic wrapper for web sockets using
	 * socket.io for support
	 */
	Socket = (function() {
	
		function Socket(path) {
			if (typeof io !== 'undefined') {
				this.connection = io.connect(path);
			} else throw 'Socket.io required';
		}
		
		Socket.prototype.on = function() {
			this.connection.on.apply(this.connection, arguments);
		};
		
		Socket.prototype.send = function() {
			this.connection.send.apply(this.connection, arguments);
		};
		
		Socket.prototype.emit = function() {
			this.connection.emit.apply(this.connection, arguments);
		};
		
		return Socket;
	
	})();
	
	/**
	 * adds wrapper for support for HTML5's geolocation
	 * TODO handle time zone differences
	 */
	Location = (function() {
	
		var location = null, timestamp = null,
				expire = 60 * 60 * 1000;
	
		return {
		
			get: function(success, error) {
			
				if (!Location.isExpired() && typeof success !== 'undefined') return success(location);
					
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						timestamp = (new Date().getTime());
						location = position.coords;
						if (typeof success == 'function') success(position.coords);
					},
					function(error) {
						switch (error.code) {
							case error.TIMEOUT:
								Log.error('Location services timeout');
								break;
							case error.POSITION_UNAVAILABLE:
								Log.error('Position unavailable');
								break;
							case error.PERMISSION_DENIED:
								Log.error('Please Enable Location Services');
								break;
							default:
								Log.error('Unknown location services error');
								break;
						}
						if (typeof error === 'function') error();
					});
				}
			
			},
			
			isExpired: function() {
				return ((new Date()).getTime() - timestamp) > expire;
			}
		
		}
	
	})();
	
	/**
	 * performs user ageent detection to determine the 
	 * browser, version, os, and device for an application
	 */
	Browser = (function() {
	
		var BrowserDetect = {
		
			init: function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
				
				// check device
				var useragent = navigator.userAgent.toLowerCase();
				if (useragent.search("iphone") > 0 || useragent.search("ipod") > 0) this.device = 'phone';
				else if (useragent.search("ipad") > 0) this.device = 'tablet';
				else if (useragent.search("mobile") > 0 && this.OS == 'Android') this.device = 'phone';
				else if (this.OS == 'Android') this.device = 'tablet';
				else this.device = 'desktop';
				if (this.OS == 'Android' && useragent.search("galaxy_tab") > 0) this.device = 'tablet';
				
				// check scrolling
				if (this.device == 'desktop') this.nativeScroll = true;
				else if (this.OS == 'iOS' && navigator.userAgent.match(/ OS 5_/i)) this.nativeScroll = true;
				else if (navigator.userAgent.match(/ HTC/i) || navigator.userAgent.match(/ Desire_A8181/i)
				  || navigator.userAgent.match(/ myTouch4G/i) || navigator.userAgent.match(/ ADR6200/i)) {
				    this.nativeScroll = true;
				} else this.nativeScroll = false;
				
			},
			
			searchString: function (data) {
				for (var i = 0; i < data.length; i++)	{
					var dataString = data[i].string;
					var dataProp = data[i].prop;
					this.versionSearchString = data[i].versionSearch || data[i].identity;
					if (dataString) {
						if (dataString.indexOf(data[i].subString) != -1)
							return data[i].identity;
					}
					else if (dataProp)
						return data[i].identity;
				}
			},
			
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				var str = dataString.substring(index+this.versionSearchString.length+1).split(' ', 1).pop();
				return str.split('.', 2).join('.').replace(';', '');
			},
			
			dataBrowser: [
				{ string: navigator.userAgent, subString: "Android", versionSearch: "Android", identity: "Android" },
				{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
				{ string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
				{ string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
				{ prop: window.opera, identity: "Opera", versionSearch: "Version" },
				{ string: navigator.vendor, subString: "iCab", identity: "iCab" },
				{ string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
				{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
				{ string: navigator.vendor, subString: "Camino", identity: "Camino" },
				{	string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
				{ string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
				{ string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
				{ string: navigator.userAgent, subString: "≈", identity: "Netscape", versionSearch: "Mozilla" }
			],
			dataOS : [
				{ string: navigator.userAgent, subString: "Android", identity: "Android" },
				{ string: navigator.userAgent, subString: "iPhone", identity: "iOS" },
				{ string: navigator.userAgent, subString: "iPad", identity: "iOS" },
				{ string: navigator.platform, subString: "Win", identity: "Windows" },
				{ string: navigator.platform, subString: "Mac", identity: "Mac" },
				{ string: navigator.platform, subString: "Linux", identity: "Linux" }
			]
		
		};
		
		BrowserDetect.init();
		
		return {
			browser: BrowserDetect.browser,
			version: BrowserDetect.version,
			os: BrowserDetect.OS,
			device: BrowserDetect.device,
			scroll: BrowserDetect.nativeScroll
		}
	
	})();
	
	Orange 					= this.Orange = {};
	Orange.version 	= '0.3';
	Orange.__import = this.__import = __import;
	Orange.modules 	= {};

	Orange.add = add;
	Orange.use = use;
	Orange.namespace = namespace;

  Orange.Ajax 				= Ajax;
	Orange.Browser 			= Browser;
	Orange.Cache 				= Cache;
	Orange.Class 				= this.Class = Class;
	Orange.Events 			= Events;
	Orange.Loaded				= Loader;
	Orange.Location 		= Location;
  Orange.Log 					= this.Log = Log;  
  Orange.Storage 			= Storage;
	

}