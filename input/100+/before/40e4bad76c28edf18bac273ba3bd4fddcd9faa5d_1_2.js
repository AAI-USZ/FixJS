function(k, v){
				var orig = Notifier.prototype[k];
				if (_.isFunction(orig)) {
					Notifier.prototype[k] = function(){
						return v.apply({scope: this, supr: orig, module: m}, arguments);
					};
				} else {
					Notifier.prototype[k] = $.extend(true, {}, orig, v );
				}
			}