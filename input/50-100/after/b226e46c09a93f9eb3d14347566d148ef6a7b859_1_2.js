function(type, opts){
					if (_.isString(opts)){
						opts = {message: opts};
					}
					var o = _.extend({}, {'type': ''}, opts);
					o.type = o.type ? type + ' ' + o.type : type;
					return scope.notify(o);
				}