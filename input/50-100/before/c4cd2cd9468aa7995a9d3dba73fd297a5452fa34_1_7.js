function(props) {
		/** @type {!Object.<string,boolean>} */
		var attrs = {};

		for (var i = 0, len = props.length; i < len; i++) {
			attrs[props[i]] = !!(props[i] in inputElement);
		}

		return attrs;
	}