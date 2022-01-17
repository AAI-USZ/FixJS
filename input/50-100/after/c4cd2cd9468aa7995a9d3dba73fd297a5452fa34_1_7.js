function(props) {
		/** @type {!Object.<string,boolean>} */
		var attrs = {};

		for (var i = 0, len = props.length; i < len; i++) {
			attrs[props[i]] = !!(props[i] in inputElement);
		}

		if (attrs['list']) {
			// safari false positive's on datalist: webk.it/74252
			// see also github.com/Modernizr/Modernizr/issues/146
			attrs['list'] = !!(goog.dom.createElement('datalist') && window['HTMLDataListElement']);
		}

		return attrs;
	}