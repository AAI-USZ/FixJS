function(object, leafToken) {
			// Binding callback called on each dependent object (parameter) that the link expression depends on.
			// For each path add a propertyChange binding to the leaf object, to trigger the compiled link expression,
			// and upate the target attribute on the target element
			if (linkFn.to !== undefined) {
				// If this link is a two-way binding, add the linkTo info to JsViews stored data
				$.data(target, jsvData).to = [object, leafToken, linkFn.to];
				// For two-way binding, there should be only one path. If not, will bind to the last one.
			}
			if ($.isArray(object)) {
				boundArrays.push(object);
				$([object]).on(arrayChangeStr, handler);
			} else {
				boundParams.push(object);
				$(object).on(propertyChangeStr, NULL, leafToken, handler);
			}
			return object;
		}