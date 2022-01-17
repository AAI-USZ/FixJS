function(element, pseudoElt) {
		//TODO:: obj.currentStyle.getPropertyValue = function(propName) {obj.currentStyle[propName]}
		//http://snipplr.com/view/13523/
		/*if(!("getPropertyValue" in element.currentStyle))element.currentStyle.getPropertyValue = function(prop) {
 			var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return element.currentStyle[prop] ? element.currentStyle[prop] : null;
		}*/
		return element.currentStyle;
	}