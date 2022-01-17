function(_, $, RenderContext) {
	var ActionContext = RenderContext.extend({
		
		_attached: false,
		
		init: function(options) {
			this._super(options);
			
			_.defaults(options, {
				event: 'click',
				data: undefined
			});
			
			this._id = _.uniqueId('action');
			this._event = options.event;
			this._data = options.data;
			
			var self = this;
			this._handler = function() {
				var value = self.target();
				if(_.isFunction(value)) 
					value.apply(this, arguments);
				// TODO log 'not a function' error to console?
			}
			
			this.on('attach', function() { this.rerender() }, this);
		},
		
		render: function() {
			return new Handlebars.SafeString('handlebind="' + this._id + '"');
		},
		
		rerender: function() {
			this._isAttached =  $('[handlebind~="' + this._id + '"]').on(this._event, this._data, this._handler).length > 0;
		},
		
		dispose: function() {
			$('[handlebind~="' + this._id + '"]').off(this._event, this._data, this._handler);
			this._super();
		}
	});
	
	return ActionContext;
}