function(options){
				var scope = this,
					el = options && options.el ? options.el : 'body',
					$el = this.$el = _.isObject(el) ? el : $(el);
				scope._cssPos = ($el.get(0)===document.body) ? 'fixed' : 'absolute';
				$el.css('position', 'relative');
				this.current = {};
				scope.NotificationView = Backbone.View.extend({
					defaults: scope.attributes,
                    on: function(eventName, handler){
                        var fn = handler,
							view = this;
                        if (_.isString(handler)) {
							fn = function(){
								view[handler].apply(view, arguments);
                            };
                        }
                        return Backbone.View.prototype.on.call(this, eventName, fn);
                    }
				});

				var notifyFn = function(type, opts){
					if (_.isString(opts)){
						opts = {message: opts};
					}
					var o = _.extend({}, {'type': ''}, opts);
                    o.type = o.type ? type + ' ' + o.type : type;
					return scope.notify(o);
				};

				var createNotifyFn = function(type){
					scope[type] = scope[type] || function(opts){
						return notifyFn(type, opts);
					};
				};

				_.each(scope.attributes.types, function(type){
					createNotifyFn(type);
				});
			}