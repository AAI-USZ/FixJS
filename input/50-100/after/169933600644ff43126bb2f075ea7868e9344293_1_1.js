function(eventName, handler){
						var fn = handler,
							view = this;
						if (_.isString(handler)) {
							fn = function(){
								view[handler].apply(view, arguments);
							};
						}
						return Backbone.View.prototype.on.call(this, eventName, fn);
					}