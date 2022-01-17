function(options) {
			
			_.defaults(options, {
				target: null,
				parent: null,
				bind: true
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
            this._handlers = {};
            this._isDirty= false;
			
			this.bind(options.bind);
		}