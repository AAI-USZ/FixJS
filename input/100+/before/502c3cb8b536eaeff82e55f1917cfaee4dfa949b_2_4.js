f
	var Binding, Form, Input, MultiViewController, ViewController;

	// import dependencies
	var Application = __import('Application'), 
			Collection 	= __import('Collection'),
			Events 			= __import('Events'), 
			Model 			= __import('Model');
	
	/**
	 * overrides the base application class to handle
	 * lookup of root view controller and default loading
	 * of root view
	 */
	Application.prototype.onLaunch = function(online) {
		
		var root = $('[data-root="true"]'),
		type = root.attr('data-control'),
		name = root.attr('data-name');
		if (typeof type === 'undefined' || typeof name === 'undefined') throw 'Root view not found';
		
		// remove root attribute
		root.removeAttr('data-root');
		
		// load view
		var c = ViewController.get(type);
		var controller = new c(null, root);
		
		controller.on('load', function() {	
			controller.show();
		});
		
		controller.load();
							
	};
	
	/**
	 * bindings are used to apply live data to DOM elements
	 * so that any updates to a Model or Collection are automatically
	 * pushed to the DOM
	 */
	Binding = Class.extend({
	
		initialize: function(node) {
	
			this.node = node;
			this.template = node.clone();
			this.eventTarget = new Events(null, this);
			this.loaded = false;
		
		},
		
		bindData: function(model, live) {
		
			// check if already loaded
			if (this.loaded) return;
		
			// pass to binding method
			this._bindData(this.node, model);
				
			// set as loaded
			this.loaded = true;
		
		},
		
		_bindData: function(node, model, id) {
		
			if (model instanceof Model) {
				var id = model.getId(), data = model.toObject();
			} else if (typeof model !== 'undefined') {
				data = model, id = id;
			} else {
				Log.error('Invalid model item');
				return;
			}
						
			if (id) node.attr('itemid', id);
			
			// parse data fields
			for (var field in data) {
				var el = node.find('[itemprop="' + field + '"]');
				var childList = [];
				node.find('[itemprop="' + field + '"]').each(function() {
					var include = false, parent = $(this).parent();
					while (parent.length !== 0 && !include) {
						if ($(parent).not(node).length === 0) {
							include = true; break;
						} else if ($(parent).not('[itemscope]').length === 0) {
							include = false; break;
						} parent = $(parent).parent();
					}
					if (include) childList.push($(this));
				});
				
				if (childList.length > 0) {
					for(var i = 0, len = childList.length; i < len; i++) {
						if (data[field] instanceof Array || data[field] instanceof Collection) {
							this._bindList(childList[i], data[field]);
						} else if (typeof data[field] === 'object' || data[field] instanceof Model) {
							this._bindData(childList[i], data[field]);
						} else childList[i].text(data[field]);
					}
				}
			}
		
		},
		
		bindList: function(list, live) {
		
			// check if already loaded
			if (this.loaded) return;
			
			// bind data
			this._bindList(this.node, list);
			
			// set as loaded
			this.loaded = true;
				
			
		},
		
		_bindList: function(node, list) {
		
			var itemscope = $(node).find('[itemscope]');
			if (!itemscope.length) return;
						
			// get template
			var template = itemscope.clone(), output = node.clone().empty();
		
			// check for the data format
			if (list instanceof O.Collection) {
				var data = list.toObject();
				for(var i in data) {
					var instance = template.clone();
					this._bindData(instance, data[i], i);
					output.append(instance);
				}
				
			} else if (list instanceof Array) {
				
				var data = list;
				for(var i=0, len = data.length; i < len; i++) {
					var instance = template.clone();
					this._bindData(instance, data[i]);
					output.append(instance);
				}
				
			}
			
			// insert into dom
			node.replaceWith(output);
		
		},
		
		clear: function() {
			
			this.node.replaceWith(this.template.clone());
			this.loaded = false;
		
		}
	
	});
	
	Form = Class.extend({
	
		initialize: function(target) {
			
			// set vars
			var that = this, name = $(target).attr('name');
			
			// set instance vars
			this.fields = {};
			this.target = target;

			// find all form fields
			$(target).find('input, select, textarea, button .ui-input').each(function() {
				var fieldName = $(this).attr('name');
				that.fields[fieldName] = $(this);
			});
			
		},
		
		getField: function(name) {
			if (typeof this.fields[name] !== 'undefined') {
				return this.fields[name];
			} else {
				throw "Error: Form field '" + name + "' not found";
			}
		},
		
		setField: function(name, value) {
			try {
				this.getField(name).val(value);
			} catch(e) {
				Log.warn('[WARN] Field "' + name +'" could not be fetched');
			}
		},
		
		getData: function() {
			var data = {};
			for (var field in this.fields) {
				var val = this.fields[field].val(), type = this.fields[field].attr('type');
				if (typeof val !== undefined && val !== null && type !== 'submit' && type !== 'button') {
					data[field] = val;
				}
			}
			return data;
		},
		
		setData: function(item) {
			var data = item;
			if (item instanceof O.Item) data = item.toObject();
			for (var field in this.fields) {
				if (typeof data[field] !== undefined && data[field] !== null) {
					this.fields[field].val(data[field]);
				}
			}
		},
		
		detach: function() {
			for (var name in this.fields) {
				this.fields[name].detach();
			}
		},
		
		destroy: function() {
			for (var name in this.fields) {
				delete this.fields[name];
			}
		}
	
	});
	

	var ViewController = O.Controller.extend({
			
		/**
		 * initializes the view controller and all its child 
		 * view controllers, forms, and elements
		 * @param {ViewController} parent
		 * @param {HTMLElement} parent
		 */
		initialize: function(parent, target) {
		
			// set vars
			var that = this, views = [], forms = [], elements = [];
		
			// set load statuses
			this.loading = false;
			this.unloading = false;
			this.loaded = false;
			
			// setup display statuses
			this.visible = false;
			this.appearing = false;
			this.disappearing = false;
			
			// setup state statuses
			this.changing = false;
			
			// create arrays
			this.loadEvts = [];
			this.unloadEvts = [];
			this.showEvts = [];
			this.hideEvts = [];
			
			// setup instance vars
			this.views = {};
			this.forms = {};
			this.elements = {};
			this.events = [];
			this.data = {};
			this.source = target.clone();
						
			// setup event target
			this.eventTarget = new O.Events(parent, this);
			
			// validate target
			if (typeof target !== 'undefined') {
				this.target = $(target);
				var _target = $(target).get(0);
			} else throw 'Invalid target';
			
			// check if parent
			this.parent = (typeof parent !== 'undefined') ? parent : null;
			if (this.parent === null) this.target.removeAttr('data-root');
			
			// validate arguments
			for (var i = 0, len = _target.attributes.length; i < len; i++) {
				if (_target.attributes[i].name.match(/data-/)) {
					this.data[_target.attributes[i].name.replace(/data-/, '')] = _target.attributes[i].value;
				}
			}
			
			// finds immediate descendant children
			var childFunc = function(selector) {
				var childList = [];
				this.target.find(selector).each(function() {
					var include = false, parent = $(this).parent();
					while (parent.length !== 0 && !include) {
						if ($(parent).not($(that.target)).length === 0) {
							include = true; break;
						} else if ($(parent).not('[data-control]').length === 0) {
							include = false; break;
						} parent = $(parent).parent();
					}
					if (include) childList.push(this);
				});
				return childList;
			}
			
			// populate child views
			views = childFunc.call(this, '[data-control]');
			forms = childFunc.call(this, 'form');
			elements = childFunc.call(this, '[data-name]:not([data-control])');
			
			// DEBUG
			console.log(this.data.name + ' ' + "Initialized");
			
			// process views
			for (var i = 0, len = views.length; i < len; i++) {
				var view = $(views[i]), name = view.attr('data-name'),
						type = view.attr('data-control'), path = view.attr('data-template'),
						isRemote = (typeof path !== 'undefined' && path.length > 0);
				
				if (isRemote) {
					var source = O.View.load(path);
					view.html($(source).html());
					cloneAttributes(source, view);
					view.removeAttr('data-template');
				}
				
				var c = ViewController.get(type);
				this.views[name] = new c(this, view);
			}
			
			// process forms
			for (var i = 0, len = forms.length; i < len; i++) {
				var form = $(forms[i]), name = form.attr('name'), child = new O.Form(form);
				this.forms[name] = child;
			}
			
			// process elements
			for (var i = 0, len = elements.length; i < len; i++) {
				var el = $(elements[i]), name = el.attr('data-name');
				if (typeof name !== 'undefined' && name.length > 0) this.elements[name] = el.removeAttr('data-name');
			}
			
			// process types
			this.target.addClass(this.getClasses());
			this.target.removeAttr('data-control').removeAttr('data-name');
			
			// store for debugging
			this.type = this.getType();
			this.name = this.data.name;
		
		},
		
		/**
		 * the unique type string for the controller. this matches the
		 * data-control value used in view markup
		 */
		getType: function() {
			return 'ui-view';
		},
		
		/**
		 * returns the outputted class names for the view. by default
		 * the getType() of the view controller as well as all its parent
		 * view controllers, as well as its data-name attribute will be added
		 */
		getClasses: function() {
			var classes = typeof this.typeList !== 'undefined' ? this.typeList : '';
			return classes + ' ' + this.data.name;
		},
	
		/**
		 * returns an array of strings of the events this function
		 * triggers. this is for informational / syntax readability purposes only
		 */
		getTriggers: function() {
			return [];
		},
		
		/**
		 * returns dynamic bindings of events on child views in the form
		 * { 'view-name' : { 'event' : 'callback' }
		 * the callback can be replaced with true to default to looking for a
		 * method in the format on{Event}. All callbacks are bound in the context
		 * of the view controller.
		 */
		getBindings: function() {
			return {};
		},
		
		
		load: function() {
		
			// return if already loading
			if (this.loading || this.loaded) return;
			
			// set statuses
			this.loading = true;
			
			// bind event handlers
			this.loadEvts.push(this.on('_load', this.onLoad, this));
			this.loadEvts.push(this.on('_loaded', this.onDidLoad, this));
			
			// call onWillLoad
			this.onWillLoad();
		
		},
		
		onWillLoad: function() {
			
			// ex. fetch data
			
			// DEBUG
			console.log(this.data.name + ' ' + "Will Load");
			
			// fire load event
			this.fire('_load');
			
		},
		
		onLoad: function() {
		
			// run functions
			
			// load children
			for (var name in this.views) {
				this.views[name].load();
			}
			
			// DEBUG
			console.log(this.data.name + ' ' + "Load");
		
			// fire loaded event
			this.fire('_loaded');
		
		},
		
		onDidLoad: function() {
		
			// run functions
					
			// unbind all event handlers
			for (var i = 0, len = this.loadEvts.length; i < len; i++) {
				this.loadEvts[i].detach();
			}
			
			// DEBUG
			console.log(this.data.name + ' ' + "Did Load");
						
			// allow unloading
			this.loadEvts = [];
			this.loading = false;
			this.loaded = true;
						
			// fire public load event
			this.fire('load');
		
		},
		
		
		unload: function() {
		
			// return if already unloading
			if (this.unloading || !this.loaded) return;
			
			// hide first if visible
			if (this.visible && !this.disappearing) {
				this.vEvt = this.on('disappear', function(e) {
					this.unload();
					this.vEvt.detach();
				}, this);
				this.hide();
				return;
			}
			
			// bind event handlers
			this.unloadEvts.push(this.on('_unload', this.onUnload, this));
			this.unloadEvts.push(this.on('_unloaded', this.onDidUnload, this));
			
			// set statuses
			this.unloading = true;
			
			// call onWillUnload
			this.onWillUnload();
		
		},
		
		onWillUnload: function() {
			
			// run functions
			console.log(this.data.name + ' ' + "Will Unload");
			
			// ex. clear data
			
			// fire unload event
			this.fire('_unload');
			
		},
		
		onUnload: function() {
			
			// unload children
			for (var name in this.views) {
				this.views[name].unload();
			}
		
			// run functions
			console.log(this.data.name + ' ' + "Unload");
		
			// fire unloaded event
			this.fire('_unloaded');
		
		},
		
		onDidUnload: function() {
		
			// run functions
			console.log(this.data.name + ' ' + "Did Unload");
						
			// unbind all event handlers
			for (var i = 0, len = this.unloadEvts.length; i < len; i++) {
				this.unloadEvts[i].detach();
			}
			
			// allow loading
			this.unloadEvts = [];
			this.unloading = false;
			this.loaded = false;
			
			// fire public unload event
			this.fire('unload');
		
		},
		
		
		show: function() {
		
			// return if already visible or appearing
			if (this.visible || this.appearing) return;
			
			// set statuses
			this.appearing = true;
			
			// bind event handlers
			this.showEvts.push(this.on('_appear', this.onAppear, this));
			this.showEvts.push(this.on('_appeared', this.onDidAppear, this));
			
			// call onWillAppear
			this.onWillAppear();
		
		},
		
		onWillAppear: function() {
			
			// run functions
			console.log(this.data.name + ' ' + "Will Appear");
			
			// bind events
			var views = this.getBindings();
												
			for (var view in views) {
				var events = views[view];
				for (var event in events) {
					var func = (typeof events[event] === 'function') ? events[event] : null;
					if (event == 'touchclick') event = O.Browser.isTouch ? 'touchend' : 'click';
					if (func === null) {
						var name = event.charAt(0).toUpperCase() + event.slice(1);
						func = (events[event] === true && typeof this['on' + name] === 'function') ? this['on' + name] : null;
					}
					if (func !== null && this.views.hasOwnProperty(view)) {	
							this.getView(view).on(event, $.proxy(func,  this));
					}
					else if (func !== null && this.elements.hasOwnProperty(view)) {
						this.getElement(view).on(event, $.proxy(func, this));
					}
				}
			}
			
			// fire appear event
			this.fire('_appear');
			
		},
		
		onAppear: function() {
				
			// show children
			for (var name in this.views) {
				this.views[name].show();
			}
			
			// run functions
			console.log(this.data.name + ' ' + "Appear");
			
			// fire appeared event
			this.fire('_appeared');
		
		},
		
		onDidAppear: function() {
		
			// run functions
			console.log(this.data.name + ' ' + "Did Appear");
		
			// unbind all event handlers
			for (var i = 0, len = this.showEvts.length; i < len; i++) {
				this.showEvts[i].detach();
			}
			
			// allow hiding
			this.showEvts = [];
			this.appearing = false;
			this.visible = true;
			
			// fire public appear event
			this.fire('appear');
		
		},
		
			
		hide: function() {
	
			// return if already hidden or hiding
			if (!this.visible || this.disappearing) return;

			// set statuses
			this.disappearing = true;
			
			// bind event handlers
			this.hideEvts.push(this.on('_disappear', this.onDisappear, this));
			this.hideEvts.push(this.on('_disappeared', this.onDidDisappear, this));
			
			// call onWillDisappear
			this.onWillDisappear();
		
		},
		
		onWillDisappear: function() {
			
			// run functions
			console.log(this.data.name + ' ' + "Will Disappear");
			
			// unbind events
			for (var view in this.views) { this.getView(view).detach(); }
			for (var form in this.forms) { this.getForm(form).detach(); }
			for (var el in this.elements) { this.getElement(el).unbind(); }
			
			// fire disappear event
			this.fire('_disappear');
			
		},
		
		onDisappear: function() {
				
			// show children
			for (var name in this.views) {
				this.views[name].hide();
			}
			
			// run functions
			console.log(this.data.name + ' ' + "Disappear");
		
			// fire disappeared event
			this.fire('_disappeared');
		
		},
		
		onDidDisappear: function() {
		
			// run functions
			console.log(this.data.name + ' ' + "Did Disappear");
		
			// unbind all event handlers
			for (var i = 0, len = this.hideEvts.length; i < len; i++) {
				this.hideEvts[i].detach();
			}
			
			// allow showing
			this.hideEvts = [];
			this.disappearing = false;
			this.visible = false;
			
			// fire public disappear event
			this.fire('disappear');
		
		},
		
		
		getView: function(name) {
			if (name instanceof ViewController) return name;
			else if (typeof this.views[name] !== 'undefined') return this.views[name];
			throw 'Error: View "' + name + '" not found';
		},
		
		getForm: function(name) {
			if (this.forms[name] instanceof Form) return this.forms[name];
			throw 'Error: Form "' + name + '" not found';
		},
	
		getElement: function(name) {
			if (typeof this.elements[name] !== 'undefined') return this.elements[name];
			throw 'Error: Element "' + name + '" not found';
		},				
		
		
		hasView: function(name) {
			return typeof this._views[name] !== 'undefined';
		},				
		
		hasForm: function(name) {
			return typeof this._forms[name] !== 'undefined';
		},
		
		hasElement: function(name) {
			return typeof this._elements[name] !== 'undefined';
		},
		
		
		on: function(event, callback, context) {
			var proxy = (typeof context !== 'undefined') ? function() { callback.apply(context, arguments); } : callback;
			return this.eventTarget.on.call(this.eventTarget, event, proxy);
		},
		
		detach: function(event, callback) {
			return this.eventTarget.detach.apply(this.eventTarget, arguments);
		},
		
		fire: function(event, data) {
			return this.eventTarget.fire.apply(this.eventTarget, arguments);
		},
		
		
		toString: function() {
			return '[' + this.getType() + ' ' + this.data.name + ']';
		},
		
		find: function(selector) {
			return $(this.target).find(selector);
		},
				
		destroy: function() {
		
			// destroy views
			for (var name in this._views) { this.views[name].destroy(); }
			for (var name in this._forms) { this.forms[name].destroy(); }
			for (var name in this._elements) { delete this.elements[name]; }
			
			// clear references
			delete this.target;
			delete this.parent;
			delete this.eventTarget;
			
		}
	
	});
	
	ViewController.views = { 'view': ViewController };
	ViewController.prototype.typeList = '';
	
	ViewController.extend = function(def) {
	
		var m = Class.extend.call(this, def),
				type = def.getType();

		var required = ['getType'];
		for (var i = 0, len = required.length; i < len; i++) {
			if (!def.hasOwnProperty(required[i])) throw "Class missing '" + required[i] + "()' implementation";
			m[required[i]] = def[required[i]];
		}
		m.prototype.typeList += ((m.prototype.typeList == '') ? '' : ' ') + type;
		m.extend = arguments.callee;
		
		return ViewController.views[type] = m;
	
	};
	
	ViewController.get = function(name) {
		if (!this.views.hasOwnProperty(name)) throw "View '" + name + '" not found';
		return this.views[name];
	};
	
	
	MultiViewController = ViewController.extend({
	
		getType: function() { return 'multi-view' },
		
		initialize: function(parent, target) {
			this._super(parent, target);
			this.defaultView = this.target.attr('data-default');
			this.target.removeAttr('data-default');
		},
		
		onLoad: function() {
			for (var i in this._views) {
				if (this._views[i].name !== this.defaultView) {
					this._views[i].target.hide();
				} else {
					this.activeView = this._views[i];
				}
			}
			this._super();
		},
		
		activateView: function(name) {
			var view = this.getView(name);
			if (view instanceof O.ViewController) {
				this.activeView.target.hide();
				this.activeView = view;
				this.activeView.target.show();
			}
		},
		
		getActiveView: function() {
			return this.activeView.name;
		}
	
	});
	
	O.Binding = Binding;
	O.Form		= Form;
	
//	O.GridViewController			= GridViewController;
//	O.LightboxViewController	= LightboxViewController;
//	O.ListViewController			= ListViewController;
//	O.MapViewController				= MapViewController;
//	O.ProgressViewController	= ProgressViewController;
//	O.TableViewController			= TableViewController;
//	O.TabViewController				= TabViewController;
//	O.TooltipViewController		= TooltipViewController;
	O.MultiViewController			= MultiViewController;
	O.ViewController					= ViewController;
	
}, ['mvc'], '1.0.2');