function(O) {

	var Application, Controller, View, Source, AjaxSource, LocalStorageSource, RestSource;
	
	// import dependencies
	var Ajax 			= __import('Ajax'),
			Cache 		= __import('Cache'),
			Events 		= __import('Events'),
			Loader 		= __import('Loader'), 
			Location 	= __import('Location'),
			Storage 	= __import('Storage');

	/**
	 * the application stores all the configuration and
	 * initial loading logic. the onLoad() method should be
	 * overriden for a custom application.
	 */
	Application = Class.extend({
	
		initialize: function(name, config) {
			
			this.name = name.replace(/[^A-Za-z:0-9_\[\]]/g);
			this.config = config;
			this.isOnline = false;
			this.isLoaded = false;
			
			// load dependencies
			for (var i = 0, len = this.config.required.length; i < len; i++) {
				Loader.loadModule(this.config.required[i]);
			}
			
			// bind onload to window
			window.onload = Class.proxy(function() {
				this.isLoaded = true;
				this.onLoad();
				Cache.init();
			}, this);
			
			// set logging
			if (this.config.hasOwnProperty('logging')) Log.setLevel(this.config.logging);
			
			// bind offline events
			Cache.on('statusChange', Class.proxy(function(e) {
								
				if (!this.isLoaded) return;
				
				if (e.data == 1) {
					Storage.goOnline();
					if (this.config.location) Location.get();
					this.onOnline.call(this);
				} else {
					Storage.goOffline();
					this.onOffline.call(this);
				}
				
			}, this));
				
			// handle versioning
			if (Storage.get('appVersion') !== this.config.version) {
				Storage.set('appVersion', this.config.version)
			}

		},
		
		onLoad: function() {}, // run at first load before anything else
		onOffline: function() {}, // run before the application goes offline
		onOnline: function() {}, // run before the application comes online
		
		goOnline: function() {
			this.isOnline = true;
		},
		
		goOffline: function() {
			this.isOnline = false;
		},
		
		isOnline: function() {
			return this.isOnline;
		}
	
	});
	
	/**
	 * this is the base controller class
	 * which will be overriden by other controllers
	 */
	Controller = Class.extend({
	
		initialize: function() {},
		destroy: function() {}
	
	});
	
	/**
	 * views can be stored externally and loaded dynamically
	 * via a given path. when loading different views from the
	 * same file, a type and or name should be included. for overriding
	 * default views, only the last view will be used if duplicates exist.
	 */
	View = (function() {
	
		var views = {};
	
		var fetch = function(path) {
						
			if (views.hasOwnProperty(path)) return views[path];
			
			var view = $.ajax({
				async: false,
		    contentType: "text/html; charset=utf-8",
		    dataType: "text",
		    timeout: 10000,
		    url: path,
		    success: function() {},
		    error: function() {
					throw "Error: template not found";
		    }
			}).responseText;
			
			views[path] = view;
			
			return view;
			
		};
	
		return {
		
			load: function(path, type, name) {
				
				if (typeof path === 'undefined' || path == '') return;

				var source = fetch(path), views, view;
				
				if ($(source).length > 1) views = $('<div>' + source + '</div>');
				else if (typeof type == 'undefined' && typeof name == 'undefined') return $(source);

				if (typeof type !== 'undefined' && typeof name !== 'undefined') {
					view = views.find('[data-control="' + type + '"][data-name="' + name + '"]:last');
				} else if (typeof type !== 'undefined') {
					view = views.find('[data-control="' + type + '"]:last');
				} else throw 'View not found';
								
				if (view.length) return view;
				else throw 'View not found';
				
			}
			
		}
	
	})();

	/**
	 * the base source class is overridden to
	 * provide custom handling of different types of
	 * data sources. the config.name property is required.
	 */
	Source = Class.extend({
	
		initialize: function(config) {
			if (typeof config === 'undefined') return;
			this.config = config;
			var name = this.config.name;
			if ((/[^A-Za-z:0-9_\[\]]/g).test(name)) throw 'Invalid character in source name "' + name + '"';
		},
		
		getName: function() {
			return (this.config || {}).hasOwnProperty('name') ? this.config.name : 'source';
		},
		
		supportsModels: function() {
			return false;
		},
		
		isPersistent: function() {
			return false;
		},
		
		destroy: function() {
			delete this.config;
		}
	
	});
	
	/**
	 * overrides the base data source to allow for data requests
	 * via ajax
	 */
	AjaxSource = Source.extend({
		
		request: function(config) {
		
			if (Cache.isActive() && !Cache.isOnline()) {
				Log.warn('Could not connect to server');
				return;
			}
		
			var success = (typeof config.success === 'function') ? config.success : null;
			var error = (typeof config.error === 'function') ? config.error : null;
			var complete = (typeof config.complete === 'function') ? config.complete : null;
		
			if (typeof config.context !== 'undefined') {
				if (success) success = function() { success.apply(context, arguments); };
				if (error) error = function() { error.apply(context, arguments); }
				if (complete) complete = function() { complete.apply(context, arguments); }
			}
			
			var req = { url: config.url, type: config.type };
			
			if (config.hasOwnProperty('async')) req.async = config.async;
			if (config.hasOwnProperty('data')) req.data = config.data;
			if (config.hasOwnProperty('dataType')) req.dataType = config.dataType;
			if (config.hasOwnProperty('contentType')) req.contentType = config.contentType;
			if (success) req.success = success;
			if (error) req.error = error;
			if (complete) req.complete;
			
			return Ajax.load(req);
		}
	
	});
	
	/**
	 * the local storage source allows the access of model
	 * data cached to localStorage via the model get/set methods
	 */
	LocalStorageSource = Source.extend({
	
		isPersistent: function() {
			return true;
		},
		
		supportsModels: function() {
			return true;
		},
		
		getPath: function(type) {
			return 'model:' + this.getName() + ':' + type;
		},
		
		getAll: function(type) {
			return Storage.get(this.getPath(type)) || undefined;
		},
		
		get: function(type, id) {
			var data = Storage.get(this.getPath(type)) || {};
			return data.hasOwnProperty(id) ? data[id] : undefined;
		},
		
		setAll: function(type, data) {
			if (data instanceof Array) throw 'Invalid input, expecting object';
			return Storage.set(this.getPath(type), data);
		},
		
		set: function(type, id, object) {
			if (id === null) id = this.nextKey(type);
			if (typeof object === 'undefined') return;
			var data = Storage.get(this.getPath(type));
			data = data || {};
			data[id] = object;
			Storage.set(this.getPath(type), data);
			return id;
		},
		
		remove: function(type, id) {
			var data = Storage.get(this.getPath(type));
			delete data[id];
			Storage.set(this.getPath(type), data);
			return true;
		},
		
		flush: function(type) {
			 Storage.remove(this.getPath(type));
		},
		
		nextKey: function(type) {
			var size = 0, key, keys = [];
			var obj = Storage.get(this.getPath(type));
			for (key in obj) {
				if (obj.hasOwnProperty(key) && !isNaN(key)) keys.push(parseInt(key, 10));
			} 
			return (keys.length > 0) ? Math.max.apply(Math, keys) + 1 : 1;
		}
	
	});
	
	/**
	 * the rest source provides a standard implementation
	 * of interaction with a REST webservice for retrieving
	 * model data
	 */
	RestSource = AjaxSource.extend({
	
		initialize: function(config) {
			if (typeof config === 'undefined') return;
			this.config = config;
			if (!this.config.hasOwnProperty('path')) throw 'Rest Source missing path';
			this.config.path = (config.path.charAt(config.path.length-1) == '/') ? config.path : config.path + '/';
			Log.info('Source "' + this.getName() + '" connected');
		},
		
		getPath: function() {
			return this.config.path;
		},
		
		getDataType: function() {
			return this.config.hasOwnProperty('dataType') ? this.config.dataType : 'text/json';
		},
	
		getAll: function(type, success, error) {		
					
			var successFunc = function(data) {
				success.call(this, this.processItems(type, data));
			}
									
			this.request({
				url: this.getPath() + this.filterType(type),
				contentType: this.getDataType(),
				type: 'GET',
				success: Class.proxy(successFunc, this),
				error: error
			});
			
		},
		
		get: function(type, id, success, error) {
	
			var successFunc = function(data) {
				data = this.processItem(type, data);
				success.call(this, data);
			}
			
			var path = this.getPath() + this.filterType(type);
			
			this.request({
				url: (path.charAt(path.length-1) == '/') ? path + id : path + '/' + id,
				contentType: this.getDataType(),
				type: 'GET',
				success: Class.proxy(successFunc, this),
				error: error
			});
			
		},
		
		set: function(type, id, object, success, error) {

			var type = this.filterType(type);
	
			var successFunc = Class.proxy(function(data) {
				data = this.processItem(type, data);
				success.call(this, data);
			}, this), path = this.getPath(), req;
			
			path = (!id) ? path + type : (path.charAt(path.length-1) == '/') ? path + type + '/' + id : path + '/' + type + '/' + id;
			
			req = {
				url: path,
				success: Class.proxy(successFunc, this),
				error: error
			}
			
			if (!id) {
				req['type'] = 'POST',
				req['data'] = object
			} else {
				req['type'] = 'PUT';
				req['data'] = JSON.stringify(object);
				req['contentType'] = 'application/json';
			}
						
			this.request(req);
	
		},
		
		remove: function(type, id, success, error) {
	
			var path = this.getPath() + this.filterType(type);
			
			this.request({
				url: (path.charAt(path.length-1) == '/') ? path + id : path + '/' + id,
				type: 'DELETE',
				success: function(data) {
					success.call(this, JSON.parse(data));
				},
				error: error
			});
			
		},
				
		processItem: function(type, data) {
			return this.filterItem(type, data);
		},
		
		processItems: function(type, data) {
			var items = this.filterItems(type, data);
			var output = [];
			for(var i = 0, len = items.length; i < len; i++) {
				output.push(this.processItem(type, items[i]));
			}
			return output;
		},
		
		filterItem: function(type, data) {
			return JSON.parse(data);
		},
		
		filterItems: function(type, data) {
			return JSON.parse(data);
		},
		
		filterType: function(type) {
			return type;
		}
	
	});
	

	O.Application = Application;
//	O.Collection	= Collection;
	O.Controller	= Controller;
//	O.Model				= Model;
//	O.Source			= Source;
	O.View				= View;
//	
	O.AjaxSource 								= AjaxSource;
	O.LocalStorageSource 				= LocalStorageSource;
	O.RestSource 								= RestSource;
//	O.PersistenceManager				= PersistenceManager;
//	O.PersistentStorageSource		= PersistentStorageSource;
	
}