function(_) {
	
	var Class_ctor = function() {};
	
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
	
	function isMethod(obj) {
	  	return 'function' === typeof obj &&
	           obj.__isMethod !== false &&
	           obj !== Boolean && obj !== Object && obj !== Number && obj !== Array && obj !== Date && obj !== String;
	}
	
	function overrideFunction(func, superFunc) {
		function K() {}
	
	  	var newFunc = function() {
	  		var ret, sup = this._super;
	    	this._super = superFunc || K;
	    	ret = func.apply(this, arguments);
	    	this._super = sup;
	    	return ret;
	  	};
	
	 	newFunc.base = func;
	  	return newFunc;
	}
	
	function applyMixin(base, mixin) {
		var key, value, ovalue;
		
		for(key in mixin) {
			if(!mixin.hasOwnProperty(key)) { continue; }
			value = mixin[key];
			
			if(isMethod(value)) {
				ovalue = base[key];
				if(!_.isFunction(ovalue)) { ovalue = null; }
				if(ovalue) 
					value = overrideFunction(value, ovalue);
			}
			
			base[key] = value;
		}
	}
	
	var inherits = function(parent, protoProps, staticProps) {
		var child = makeCtor(), proto;
	
		_.extend(child, parent);
		
		proto = child.prototype = Object.create(parent.prototype);
		proto.constructor = child;
	
		if (protoProps) applyMixin(proto, protoProps);
		if (staticProps) applyMixin(child, staticProps);
		
		child.superclass = parent;
		child.__super__ = parent.prototype;
		
		return child;
	}
	
	var extend = function(protoProps, staticProps) {
		var child = inherits(this, protoProps, staticProps);
		child.extend = this.extend;
		return child;
	}

	var BaseObject = makeCtor();
	//BaseObject.extend = extend;
	
	return BaseObject;
}