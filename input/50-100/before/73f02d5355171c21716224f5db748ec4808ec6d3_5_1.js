function makeCtor() {
		var Class = function() {
			this.init.apply(this, arguments);
		}
		
		_.extend(Class, {
			__isMethod: false,
			extend: extend,
			invoke: function() {
				Class_ctor.prototype = this.prototype;
				var instance = new Class_ctor();
				this.apply(instance, arguments);
				return instance;
			}
		})
		
		Class.prototype.init = function() {};
		
		return Class;
	}