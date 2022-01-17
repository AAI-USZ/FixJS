function bindDataLinkTarget(source, target, attr, linkFn, view) {
		//Add data link bindings for a link expression in data-link attribute markup
		var boundParams = [],
			storedLinks = jsViewsData(target, linkStr, TRUE),
			handler = function() {
				propertyChangeHandler.apply({ tgt: target, src: source, attr: attr, fn: linkFn, view: view }, arguments);
			};

		// Store for unbinding
		storedLinks[attr] = { srcs: boundParams, hlr: handler };

		// Call the handler for initialization and parameter binding
		handler(undefined, undefined, function(object, leafToken) {
			// Binding callback called on each dependent object (parameter) that the link expression depends on.
			// For each path add a propertyChange binding to the leaf object, to trigger the compiled link expression,
			// and upate the target attribute on the target element
			boundParams.push(object);
			if (linkFn.to !== undefined) {
				// If this link is a two-way binding, add the linkTo info to JsViews stored data
				$.data(target, jsvData).to = [object, leafToken, linkFn.to];
				// For two-way binding, there should be only one path. If not, will bind to the last one.
			}
			if ($.isArray(object)) {
				$([object]).on(arrayChangeStr, function() {
					handler();
				});
			} else {
				$(object).on(propertyChangeStr, NULL, leafToken, handler);
			}
			return object;
		});
		// Note that until observable deals with managing listeners on object graphs, we can't support changing objects higher up the chain, so there is no reason
		// to attach listeners to them. Even $.observable( person ).setProperty( "address.city", ... ); is in fact triggering propertyChange on the leaf object (address)
	}