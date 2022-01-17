function(options) {
			this._super(options);
			
			_.defaults(options, {
				event: 'click',
				data: undefined
			});
			
			this._id = _.uniqueId('action');
			this._event = options.event;
			this._data = options.data;
            this._attached = false;
			
			var self = this;
			this._handler = function() {
				var value = self.target();
				if(_.isFunction(value)) 
					value.apply(this, arguments);
				// TODO log 'not a function' error to console?
			};
			
			this.on('attach', function() { this.rerender() }, this);
		}