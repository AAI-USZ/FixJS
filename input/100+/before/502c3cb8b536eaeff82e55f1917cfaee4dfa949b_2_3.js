function(parent, target) {
		
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
		
		}