function(k, v){
				var orig = Notifier.prototype[k];
				if (_.isFunction(v) || orig === undefined) {
					Notifier.prototype[k] = function(){
						return v.apply({scope: this, supr: orig, module: m}, arguments);
					};
				} else if (!_.isObject(v)) {
					Notifier.prototype[k] = v;
				} else {
					Notifier.prototype[k] = $.extend(true, {}, orig, v);
				}
			}