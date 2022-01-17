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
					PersistenceManager.init();
					if (this.config.location) Location.get();
					this.onOnline.call(this);
				} else {
					Storage.goOffline();
					this.onOffline.call(this);
				}
				
			}, this));
				
			// handle versioning
			if (Storage.get('appVersion') !== this.config.version) {
				PersistenceManager.flush();
				Storage.set('appVersion', this.config.version);
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
	
	
	PersistentStorageSource = Source.extend({
	
		isPersistent: function() {
			return true;
		},
		
		supportsModels: function() {
			return true;
		},
		
		getPath: function() {
			return this.getName() + ':' + 'model';
		},
		
		getAllActions: function() {
			var models = Storage.get(this.getPath()) || {}, output = {};
			for (var model in models) {
				var m = Model._models[model],
						actions = models[model];
				for (var id in actions) {
					output[id] = { model: m, item: actions[id] };
				}
			}
			return (output) ? output : null;
		},
		
		getAll: function(type) {
			var models = Storage.get(this.getPath());
			return (typeof models !== 'undefined' && models.hasOwnProperty(type)) ? models[type] : null; 
		},
		
		get: function(type, id) {
			var models = Storage.get(this.getPath());
			return (typeof models !== 'undefined' && models.hasOwnProperty(type)) ? (models[type].hasOwnProperty(id) ? models[type][id] : null) : null; 
		},
		
		setAll: function(type, data) {
			if (data instanceof Array) throw 'Invalid input, expecting object';
			var models = Storage.get(this.getPath());
			models[type] = data;
			return Storage.set(this.getPath(), models);
		},
		
		set: function(type, id, object) {
			if (id === null) id = this.nextKey(type);
			var data = Storage.get(this.getPath()) || {};
			if (!data.hasOwnProperty(type)) data[type] = {};
			data[type][id] = object;
			Storage.set(this.getPath(), data);
			return id;
		},
		
		remove: function(type, id) {
			var data = Storage.get(this.getPath());
			if (data && data.hasOwnProperty(type) && data[type].hasOwnProperty(id)) delete data[type][id];
			else return null;
			Storage.set(this.getPath(), data);
			return true;
		},
		
		flush: function(type) {
			 Storage.remove(this.getPath());
		},
		
		nextKey: function(type) {
			var size = 0, key, keys = [];
			var obj = Storage.get(this.getPath()) || {};
			if (obj.hasOwnProperty(type)) obj = obj[type];
			else obj[type] = {};
			for (key in obj) {
				if (obj.hasOwnProperty(key) && !isNaN(key)) keys.push(parseInt(key, 10));
			} 
			return (keys.length > 0) ? Math.max.apply(Math, keys) + 1 : 1;
		}
	
	});
	
	/**
	 * represents each data instance and can be manipulated
	 * and edited in real time
	 */
	Model = Class.extend({
		
		initialize: function(data) {
			this.getName();
			var field = this.constructor.getKey();
			this.isSaved = (data || {}).hasOwnProperty(field);
			this.id = this.isSaved ? data[field] : null;
			this.data = data || {};
			if (data.hasOwnProperty('_unsaved')) this.isSaved = false;
		},
		
		getName: function() {
			throw 'Cannot instantiate model';
		},
		
		getFields: function() {
			throw 'Cannot instantiate model';
		},
		
		getSource: function() {
			throw 'Cannot instantiate model';
		},
		
		get: function(name) {
			return this.data[name];
		},
		
		set: function(name, value) {
			this.data[name] = value;
			this.isSaved = false;
		},
		
		clear: function() {
			delete this.data[name];
			this.isSaved = false;
		},
		
		refresh: function() {
			var item = this.constructor.get(this.getId());
			this.data = item.toObject();
			this.isSaved = true;
			// prevent duplicate refreshes
		},
		
		save: function(success, error, context) {
			if (this.isSaved) return;
			var successFunc = function(data) {
				this.isSaved = true;
				if (typeof success === 'function') success(data);
			};
			this.constructor.set(this.data, Class.proxy(successFunc, this), error, context);
		},
		
		remove: function(success, error, context) {
			if (this.exists()) {
				this.constructor.remove(this.id, success, error, context);
			}
			this.destroy();
		},
		
		mergeChanges: function(deltas) {
			
			// merge values
			
		},
		
		isSaved: function() {
			return this.isSaved;
		},
		
		exists: function() {
			return this.id !== null;
		},
		
		getId: function() {
			return this.id;
		},
		
		getModel: function() {
			return this.constructor;
		},
		
		toObject: function() {
			return this.data;
		},
		
		destroy: function() {
			this.isSaved = false;
			this.id = null;
			this.data = {};
		}
		
	});
	
	Model.getKey = function() {
		var fields = this.getFields();
		for(var field in fields) {
			if (fields[field].hasOwnProperty('primaryKey')) return field;
		}
	};
	
	Model.getId = function() {
		var fields = this.getFields();
		for(var field in fields) {
			if (fields[field].hasOwnProperty('primaryKey')) return fields[field].name;
		}
	};
	
	Model.getAll = function(query, success, error, context) {
		var context = typeof context === 'function' ? context : this;
		var successFunc = function(data) {
			var mappedData = Model.mapItems.call(this, data), output = {};
			if (typeof query === 'function') {
				for (var i in mappedData) {
					if (query == null || query.call(this, mappedData[i])) {
						output[i] = mappedData[i];
					}
				} mappedData = output;
			}
			success.call(context, new Collection(this, mappedData));
		};
		PersistenceManager.getAll(this, Class.proxy(successFunc, this), Class.proxy(error, context));
	};
	
	Model.get = function(id, success, error, context) {
		var context = typeof context === 'function' ? context : this;
		var successFunc = function(data) {
			var mappedData = Model.mapItem.call(this, data);
			success.call(context, new this(mappedData));
		};
		PersistenceManager.get(this, id, Class.proxy(successFunc, this), Class.proxy(error, context));
	};
	
	Model.set = function(item, success, error, context) {
		if (item instanceof Model) item = item.toObject();
		var id = item.hasOwnProperty(this.getKey()) ? item[this.getKey()] : null;
		var context = typeof context === 'function' ? context : this;
		var successFunc = function(data) {
			var mappedData = Model.mapItem.call(this, data);
			success.call(context, new this(mappedData));
		};
		PersistenceManager.set(this, id, Model.unmapItem.call(this, item), Class.proxy(successFunc, this), Class.proxy(error, context));
	};
	
	Model.remove = function(id, success, error, context) {
		var context = typeof context === 'function' ? context : this, deltaId = id;
		var successFunc = function(data) {
			success.call(context, deltaId);
		};
		PersistenceManager.remove(this, id, Class.proxy(successFunc, this), Class.proxy(error, context));
	};
	
	Model.on = function(ev, call, context) {
		var proxy = (typeof context !== 'undefined') ? function() { call.apply(context, arguments); } : call;
		return this.events.on.call(this.events, ev, proxy);
	},
	
	Model.fire = function() {
		return this.events.fire.apply(this.events, arguments);
	},
	
	Model.detach = function() {
		return this.events.detach.apply(this.events, arguments);
	},
	
	Model.mapItem = function(data) {
		var model = {}, fields = this.getFields();											
		for (var field in fields) {
			var source = fields[field].name, 
					value = (data.hasOwnProperty(source)) && data[source] != null ? data[source] : undefined;		
			if (value === undefined && !fields[field].nullable) {
				Log.warn("Could not parse JSON field '" + field + "' for " + this.getName());
				continue;
			}
			else if (value !== undefined) model[field] = value;
		}
		return model;
	},
	
	Model.mapItems = function(data) {
		var models = {}, id = this.getKey();
		for (var i in data) {
			var model = Model.mapItem.call(this, data[i]);
			if (typeof model === 'object') models[i] = model;
		}	
		return models;	
	},
	
	Model.unmapItem = function(object) {	
		var data = {}, fields = this.getFields();
		for (var field in fields) {
			if (this.getKey() == field && !object.hasOwnProperty(this.getKey())) {
				continue;
			}
			var source = fields[field].name,
					value = (object.hasOwnProperty(field)) ? object[field] : undefined;
			if (value === undefined && !fields[field].nullable) {
				Log.warn("Missing data for field '" + field + "' for " + this.getName());
				continue;
			}		
			else if (value !== undefined) data[source] = value;
		}
		return data;
	}
	
	Model._models = {};
	
	Model.extend = function(def) {
		
		var m = Class.extend.call(this, def);
				
		var required = ['getName', 'getFields', 'getSource'];
		for (var i = 0, len = required.length; i < len; i++) {
			if (!def.hasOwnProperty(required[i])) throw "Class missing '" + required[i] + "()' implementation";
			m[required[i]] = def[required[i]];
		}
		
		var source = def.getSource();
		if (!source.supportsModels()) throw "Source '" + source.getName() + "' does not support models";
		
		m.events = new Events(null, this);
		
		m.getId = function() { return Model.getId.apply(m, arguments); };
		m.getKey = function() { return Model.getKey.apply(m, arguments); };
		m.getAll = function() { return Model.getAll.apply(m, arguments); };
		m.get = function() { return Model.get.apply(m, arguments); };
		m.set = function() { return Model.set.apply(m, arguments); };
		m.remove = function() { return Model.remove.apply(m, arguments); };
		
		m.on = function() { return Model.on.apply(m, arguments); };
		m.fire = function() { return Model.fire.apply(m, arguments); };
		m.detach = function() { return Model.detach.apply(m, arguments); };
		
		Model._models[m.getName()] = m;
		
		return m;
			
	};
	
	/**
	 * represents a list of model objects and allows
	 * for filtering and fetching
	 */
	Collection = Class.extend({
		
		initialize: function(model, data) {
			this.model = model
			this.data = data;
			this.active = data;
			this.list = this.toArray();
		},
		
		getModel: function() {
			return this.model;
		},
		
		count: function() {
			return this.list.length;
		},
		
		get: function(id) {
			return this.data.hasOwnProperty(id) ? new this.model(this.data[id]) : null;
		},
		
		filter: function(callback) {
			if (typeof callback === 'function' && this.active !== undefined) {
				for(var id in this.active) {
					if (!callback.call(this, this.active[id] || {})) delete this.active[id];
				}
			}
		},
		
		clearFilters: function() {
			this.active = this.data;
		},
		
		toArray: function() {
			var output = [];
			for (var id in this.active) {
				output.push(this.active[id]);
			}
			return output;
		},
		
		toObject: function() {
			return this.active;
		},
		
		getModel: function() {
			return this.model;
		}
		
	});
		
	/**
	 * manages persistent data across offline and online
	 * states
	 */
	PersistenceManager = (function() {
	
		var isSyncing = false, isLive = false;
		
		PersistenceManager.init = function() {
						
			isLive = !(Cache.isActive() && !Cache.isOnline());
			
			this.cacheDS = new LocalStorageSource({ name: 'cache' });
			this.createDS = new PersistentStorageSource({ name: 'create' });
			this.updateDS = new PersistentStorageSource({ name: 'update' });
			this.deleteDS = new PersistentStorageSource({ name: 'delete' });
			this.pendingDS = new PersistentStorageSource({ name: 'pending' });
			
			Cache.on('statusChange', Class.proxy(this.onStatusChange, this));
			
		};
		
		PersistenceManager.getAll = function(model, success, error) {
			
			var offlineFunc = function(data) {
			
				var creates = this.createDS.getAll(model.getName()),
						updates = this.updateDS.getAll(model.getName()),
						deletes = this.deleteDS.getAll(model.getName()),
						pending = this.pendingDS.getAll(model.getName());
								
				for (var key in creates) {
					var c = creates[key];
					c[model.getId()] = 'c' + key;
					data['c' + key] = c;
				}
				for (var key in updates) data[key] = updates[key];
				for (var key in deletes) delete data[key];
								
				if (isSyncing) for (var key in pending) data[pending[model.getId()]] = pending[key];
				
				success(data);
			
			};
			
			var onlineFunc = function(data) {
				var output = {};
				for (var i = 0, len = data.length; i < len; i++) {
					output[data[i][model.getId()]] = data[i];
				}
				this.cacheDS.setAll(model.getName(), output); // TO DO: check if this is array or list
				success.call(this, output);
			};
				
			if (!isLive) {
				var items = this.cacheDS.getAll(model.getName());
				if (items != undefined) offlineFunc.call(this, items)
				else error.call(this);
			}
			else model.getSource().getAll(model.getName(), Class.proxy(onlineFunc, this), error);
		
		};

		PersistenceManager.get = function(model, id, success, error) {
							
			var onlineFunc = function(data) {
				this.cacheDS.set(model.getName(), id, data);
				success(data);
			};
			
			var onlineFuncError = function(e) {
				if (e.status == '404') {
					this.cacheDS.remove(model.getName(), id);
				} error(e);
			};
			
			if (!isLive) {

				var item = this.cacheDS.get(model.getName(), id);
								
				var creates = this.createDS.getAll(model.getName()),
						updates = this.updateDS.getAll(model.getName()),
						deletes = this.deleteDS.getAll(model.getName()),
						pending = this.pendingDS.getAll(model.getName()),
						data = null;
				
				if (isSyncing) {
					for (var i in pending) {
						if (pending[i].hasOwnProperty(model.getId()) && pending[i][model.getId()] == id) data = pending[i];
					}
				}
				
				var cid = false;
				if (id.substr(0, 1) == 'c') cid = true;

				if (cid && creates && creates.hasOwnProperty(id.substr(1))) {
					data = creates[id.substr(1)];
					if (data) data[model.getId()] = id;
				}
				if (!cid && updates && updates.hasOwnProperty(id) && data == null) data = updates[id];
				if (!cid && deletes && deletes.hasOwnProperty(id)) throw "Cannot fetch deleted item";
								
				if (item != undefined || data) success((!data) ? item : data);
				else error.call(this);
			}
			else model.getSource().get(model.getName(), id, Class.proxy(onlineFunc, this), Class.proxy(onlineFuncError, this));
		
		};
		
		
		PersistenceManager.set = function(model, id, item, success, error) {
									
			var offlineFunc = function(data) {
				data['_unsaved'] = true;
				success(data);
			};
			
			var onlineFunc = function(data) {
				this.cacheDS.set(model.getName(), data[model.getId()], data);
				success(data);
			};
						
			if (!isLive) {
								
				if (!id) {
								
					var id = 'c' + this.createDS.set(model.getName(), null, item);
					if (!id) error();
					else {
						item[model.getId()] = id;
						offlineFunc(item);
					}
				} else if (isSyncing) {
										
					var deletes = this.deleteDS.getAll(model.getName());
				
					if (deletes && deletes.hasOwnProperty(id)) {
						throw 'Cannot update already removed item';
					} else {
						this.pendingDS.set(model.getName(), null, item);
						offlineFunc.call(this, item);
					}
						
				} else {
										
					var creates = this.createDS.getAll(model.getName()),
							deletes = this.deleteDS.getAll(model.getName());
				
					if (creates && creates.hasOwnProperty(id.substr(1))) this.createDS.set(model.getName(), id.substr(1), item);
					else if (deletes && deletes.hasOwnProperty(id)) throw 'Cannot update already removed item';
					else this.updateDS.set(model.getName(), id, item);
					
					offlineFunc.call(this, item);
						
				}
								
			}
			else model.getSource().set(model.getName(), id, item, Class.proxy(onlineFunc, this), error);
		
		};
		
		PersistenceManager.remove = function(model, id, success, error) {
						
			var onlineFunc = function(data) {
				this.cacheDS.remove(model.getName(), id);
				success(data);
			};
		
			if (!isLive) {
						
				var creates = this.createDS.getAll(model.getName()),
						updates = this.updateDS.getAll(model.getName()),
						deletes = this.deleteDS.getAll(model.getName());
						
				var cid = false;
				if (id.substr(0, 1) == 'c') cid = true;
			
				if (cid && creates && creates.hasOwnProperty(id.substr(1))) this.createDS.remove(model.getName(), id.substr(1));
				if (!cid && updates && updates.hasOwnProperty(id)) this.updateDS.remove(model.getName(), id);
				if (!cid && deletes && deletes.hasOwnProperty(id)) throw 'Cannot delete already removed item';
				else if (!cid) this.deleteDS.set(model.getName(), id, {});
				
				success(id);
				
			} else model.getSource().remove(model.getName(), id, Class.proxy(onlineFunc, this), error);
			
		};
		
		PersistenceManager.flush = function() {
		
			this.createDS.flush(true);
			this.updateDS.flush(true);
			this.deleteDS.flush(true);
			this.pendingDS.flush(true);
			
		};
		
		PersistenceManager.onStatusChange = function(e) {
						
			if (e.data == 1 && !isSyncing) {
				this.onSync();				
			} else {
				if (isSyncing) {
					this.onSyncFailure.call(this);
				} else {
					isLive = !(Cache.isActive() && !Cache.isOnline());
				}
			}
			
		};
		
		PersistenceManager.onSync = function(force) {
			
			if (isSyncing && !force) return;
			
			isSyncing = true;
			
			var createSuccessFunc = function(data, id, name, newId) {
								
				this.createDS.remove(name, id);
				this.cacheDS.set(name, newId, data);
				
				this.syncCount--;
				this.checkSyncStatus();
			
			};
			
			var updateSuccessFunc = function(data, id, name) {
						
				this.updateDS.remove(name, id);
				this.cacheDS.set(name, id, data);
				
				this.syncCount--;
				this.checkSyncStatus();
			
			};
			
			var deleteSuccessFunc = function(id, name) {
								
				this.deleteDS.remove(name, id);
				this.cacheDS.remove(name, id);
				
				this.syncCount--;
				this.checkSyncStatus();
			
			};
				
			var creates = this.createDS.getAllActions(),
					updates = this.updateDS.getAllActions(),
					deletes = this.deleteDS.getAllActions();
					
			this.syncCount = 0;

			if (creates) for (var i in creates) this.syncCount++;
			if (updates) for (var i in updates) this.syncCount++;
			if (deletes) for (var i in deletes) this.syncCount++;
						
			if (this.syncCount == 0) {
				this.checkSyncStatus();
				return;
			}
			
			var syncCreate = Class.proxy(function(id, object) {
				var model = object.model;
				var item = object.item;
				delete item[model.getId()];
				model.getSource().set(model.getName(), null, item, Class.proxy(function(data) {				
					createSuccessFunc.call(this, data, id, model.getName(), data[model.getId()]);				
				}, this), this.onSyncFailure);
			}, this);
			
			var syncUpdate = Class.proxy(function(id, object) {
				var model = object.model;
				model.getSource().set(model.getName(), id, object.item, Class.proxy(function(data) {				
					updateSuccessFunc.call(this, data, id, model.getName());				
				}, this), this.onSyncFailure);
			}, this);
			
			var syncDelete = Class.proxy(function(id, object) {
				var model = object.model;
				model.getSource().remove(model.getName(), id, Class.proxy(function(data) {				
					deleteSuccessFunc.call(this, id, model.getName());				
				}, this), this.onSyncFailure);
			}, this);
		
			for (var id in creates) syncCreate(id, creates[id]);
			for (var id in updates) syncUpdate(id, updates[id]);
			for (var id in deletes) syncDelete(id, deletes[id]);
					
		};
		
		PersistenceManager.onSyncSuccess = function() {

			isSyncing = false;
			isLive = !(Cache.isActive() && !Cache.isOnline());
		
			Log.info("Unsaved data pushed to server.");
			
		};
		
		PersistenceManager.onSyncFailure = function() {
			Log.info("Could not push unsaved data to server.");
		};
		
		PersistenceManager.checkSyncStatus = function() {
						
			if (this.syncCount == 0) {
				var pending = this.pendingDS.getAllActions();
				if (pending.length > 0) {				
					for (var i in pending) {					
						var model = pending[i].model, item = pending[i].item;
						if (item.hasOwnProperty(model.getId())) var id = item[model.getId()];
						else throw "Pending item missing id";
						this.updateDS.set(model.getName(), item, id);
						this.pendingDS.remove(model.getName(), id);						
					}					
					this.onSync(true)					
				} else PersistenceManager.onSyncSuccess.call(this);
			}
			
		};
		
		PersistenceManager.destroy = function() {
			Cache.detach('statusChange', this.proxy);
		}
		
		function PersistenceManager() {}
		
		return PersistenceManager;
	
	})();
		

	O.Application = Application;
	O.Collection	= Collection;
	O.Controller	= Controller;
	O.Model				= Model;
	O.Source			= Source;
	O.View				= View;

	O.AjaxSource 								= AjaxSource;
	O.LocalStorageSource 				= LocalStorageSource;
	O.RestSource 								= RestSource;
	O.PersistenceManager				= PersistenceManager;
	O.PersistentStorageSource		= PersistentStorageSource;
	
}