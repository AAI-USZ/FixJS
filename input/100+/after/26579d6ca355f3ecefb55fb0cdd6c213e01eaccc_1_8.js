function(name){
		var getter = propertyGetters[name.toLowerCase()];
		if (getter) return getter(this);
		/* <ltIE9> */
		if (pollutesGetAttribute){
			var attr = this.getAttributeNode(name), attributeWhiteList = this.retrieve('$attributeWhiteList', {});
			if (!attr) return null;
			if (attr.expando && !attributeWhiteList[name]){
				var outer = this.outerHTML;
				// segment by the opening tag and find mention of attribute name
				if (outer.substr(0, outer.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(name) < 0) return null;
				attributeWhiteList[name] = true;
			}
		}
		/* </ltIE9> */
		var result = Slick.getAttribute(this, name);
		return (!result && !Slick.hasAttribute(this, name)) ? null : result;
	}