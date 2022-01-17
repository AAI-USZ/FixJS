function makeAttrString(element) {
		var attrs = getAttrs(element);
		var str = "";
		for (var i = 0; i < attrs.length; i++) {
			var name  = attrs[i][0];
			var value = attrs[i][1];
			if ( "" === value || null == value ) {
				// I don't think it is ever an error to make an
				// attribute not appear if its string value is empty.
				continue;
			}
			// The XHTML spec says attributes are lowercase
			name = name.toLowerCase();
			//TODO it's only a boolean attribute if the element is in an HTML namespace
			var isBool = (-1 !== $.inArray(name, booleanAttrs));
			if ( ! isBool || (isBool && value) ) {
				str += " " + name + '="' + encodeDqAttrValue( "" + (isBool ? name : value) ) + '"';
			}
		}
		return str;
	}