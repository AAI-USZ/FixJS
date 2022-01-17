function(name){
		var getter = propertyGetters[name.toLowerCase()];
		if (getter) return getter(this);
		var result = Slick.getAttribute(this, name);
		return (!result && !Slick.hasAttribute(this, name)) ? null : result;
	}