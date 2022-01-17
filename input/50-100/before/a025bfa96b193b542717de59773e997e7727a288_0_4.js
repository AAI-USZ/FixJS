function jQuery_make (tagName, options) {
			/* Faster element creation. */
			var domEl = [document.createElement(tagName)]
			  , jq = $
			  ;

			jq.fn.prop.call(domEl, options, true);
			return jq.merge(jq(), domEl);
	}