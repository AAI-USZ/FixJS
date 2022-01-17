function makeAttrString(element) {
		var attrs = getAttrs(element);
		var str = "";
		for (var i = 0; i < attrs.length; i++) {
			// The XHTML spec says attributes are lowercase
			var name  = attrs[i][0].toLowerCase();
			var value = attrs[i][1];

			//TODO it's only a boolean attribute if the element is in an HTML namespace
			var isBool = (-1 !== $.inArray(name.toLowerCase(), booleanAttrs));

			if (!isBool && ("" === value || null == value)) {
				// I don't think it is ever an error to make an
				// attribute not appear if its string value is empty.
				continue;
			}

			// For boolean attributes, the mere existence of the attribute means it is true.
			str += " " + name + '="' + encodeDqAttrValue("" + (isBool ? name : value)) + '"';
		}
		return str;
	}