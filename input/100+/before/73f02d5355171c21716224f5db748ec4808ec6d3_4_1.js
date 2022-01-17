function(_, $, BaseObject, Metamorph) {
	
	var matchRoot = /^\$root\./i,	
		matchLeadingParent = /^\$parent\.*/i,	
		matchParentsIndexer = /^\$parents\[([0-9]){1,}\]\./i, // results[1] is the indexer value
		matchFuncCall = /(.*?)\(\)/i, // matches a call with no-parameters
		matchIndexer = /(.*?)\[([0-9]){1,}\]/i; // results[1] is property, results[2] is the index
	
	
	var RenderContext = BaseObject.extend({
		
		_handlers: {},
		_isDirty: false,
		_bind: undefined,
		
		_target: null,
		
		init: function(options) {
			
			_.defaults(options, {
				target: null,
				parent: null,
				bind: true,
			});
			
			this._target = options.target;
			
			if(!!options['parent']) { //TODO check if 'parent' is an instance of BindingContext
				var parent = options['parent'];
				
				this['$rootContext'] = parent['$rootContext'];
				this['$parentContext'] = parent;
				this['$parent'] = parent.target();
				this['$parents'] = (parent['$parents'] || []).slice(0);
				this['$parents'].unshift(this['$parent']);
				this['$root'] = parent['$root'];
				
				parent['children'] = parent['children'] || [];
				parent['children'].push(this);
			}
			else {
				this['$rootContext'] = this;
				this['$parentContext'] = null;
				this['$parent'] = null;
				this['$parents'] = [];
				this['$root'] = this._target;
			}
			
			this.children = [];
			
			this.bind(options.bind);
		},
		
		target: function() {
			var value = this._target;
			
			if(_.isString(value) && value.match(/^path::.*/i)) 
				value = this._get(value.substr("path::".length));
			
			return value;
		 },
		
		bind: function() {
			if(arguments.length > 0) {
				var parentBinding = !this.$parentContext ? true : this.$parentContext.bind();
				this._bind = parentBinding && !!arguments[0];
			}
			else
				return this._bind;
		},
		
		render: function() { 
			var value = _.result(this, '_target');
			if(value === null || value === undefined)
				return "";
			else
				return value.toString();
		},
		
		rerender: function() { },
		
		on: function(event, handler, context) {
			var handlers = this._handlers[event];
			if(!_.isArray(handlers))
				handlers = this._handlers[event] = [];
			
			handlers.push({ callback: handler, context: context }); //TODO create and return a token that can cause a handler to be removed externally
		},
		
		//TODO off: function(event, handler, context); ??? or use a captured token to dispose
		
		triggerChildren: function(event, data) {
			var children = this['children'];
			if(children && _.isArray(children)) {
				_.each(children, function(child) { child.trigger(event, data); });
			}
		},
		
		trigger: function(event, data) {
			var handlers = this._handlers[event];
			if(_.isArray(handlers)) {
				_.each(handlers, function(handler) {
					handler.callback.call(handler.context, data);
				});
			}
			
			this.triggerChildren(event, data);
		},
		
		isDirty: function()  {
			if(arguments.length > 0)
				this._isDirty = !!arguments[0];
			else
				return this._isDirty;
		},
		
		cleanChildren: function() {
			var children = this['children'];
			if(children && _.isArray(children)) {
				_.each(children, function(child) { child.clean(); });
			}
		},
		
		clean: function() {
			if(this.isDirty()) {
				this.rerender();
				this.isDirty(false);
			}
			else 
				this.cleanChildren();
		},
		
		isDisposed: function() { return this._isDisposed; },
		
		disposeChildren: function() {
			var children = this['children'];
			if(children && _.isArray(children)) {
				_.each(children, function(child) { child.dispose() });
				children.splice(0, children.length);
			}
		},
		
		dispose: function() {
			this.disposeChildren();
			this._disposed = true;
		},
		
		_get: function(path, context) {
			if(_.isString(path) && path.length > 0) {
				// the path should be a string of non-zero length

				var matches;
				
				if(context === undefined)
					context = this['$data'];

				if(path.charAt(0) === '$') {
					// path contains a control character-- check for context based 
					
					matches = path.match(matchRoot);
					if(matches) {
						// $root.
						path = path.substr(matches[0].length - 1);
						context = this['$root'];
						
						return this._get(path, context);
					}
					else {
						// count parent indices using $parent.$parent
						var parent_index = 0;	//index from 1 
						matches = path.match(matchLeadingParent);
						while(matches) {
							parent_index++;
							path = path.substr(matches[0].length - 1);						
							matches = path.match(matchLeadingParent);
						}
						
						matches = path.match(matchParentsIndexer);
						if(matches) {
							// $parents[i]. indexer
							path = path.substr(matches[0].length - 1);	
							parent_index += matches[1] + 1;	//index starts at 1		
						}
						
						if(parent_index - 1 > 0) { //subtract 1 for actual index
							context = this['$parents'][parent_index];
							return this._get(path, context);
						}
					} // end matchers block
				} // end '$' block
				
				var elements = path.split('.'), 
					element;
				for(var i=0, j=elements.length; i < j; i++) {
					if(context === null || context === undefined)
						return context;
					else {
						element = elements[i];
						
						matches = element.match(matchIndexer);
						if(matches) {
							// matches indexer
							context = context[matches[1]];
							if(context)
								context = context[matches[2]];
						}
						else {
							matches = element.match(matchFuncCall);
							if(matches) {
								// matches no-arg function call
								context = context[matches[1]].call(context);
							}
							else
								context = context[element];
						}
					} // end context test block
				} // end for loop
				
				return context;
			}
			else 
				return null;
		}
	});
	
	return RenderContext;
}