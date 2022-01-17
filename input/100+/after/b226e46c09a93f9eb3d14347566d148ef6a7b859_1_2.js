function(options){
				var scope = this;
				this.el = options && options.el;
				this.initEl.call(this, options && options.el);

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

				if (scope.attributes) {
					var initialModules = this.attributes.modules;
					initialModules && $.each(initialModules, function(mName, m){
						m.name = _.isArray(initialModules) ? m.name : mName;
						Notifier.regModule(m);
					});
					scope.attributes.modules = undefined;
				}
			}