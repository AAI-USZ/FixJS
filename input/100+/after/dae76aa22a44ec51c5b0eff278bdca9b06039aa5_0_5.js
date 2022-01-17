function clean(elem) {
		// Remove data-link bindings, or contained views

		// Note that if we remove an element from the DOM which is a top-level node of a view, this code
		// will NOT remove it from the view.nodes collection. Consider whether we want to support that scenario...

		var l, link, attr, parentView, view, srcs, collData, linksAndViews,
			jQueryDataOnElement = $.cache[elem[$.expando]];

		// Get jQueryDataOnElement = $.data(elem, jsvData)
		// (Using a faster but more verbose way of accessing the data - for perf optimization, especially on elements not linked by JsViews)
		jQueryDataOnElement = jQueryDataOnElement && jQueryDataOnElement.data;
		linksAndViews = jQueryDataOnElement && jQueryDataOnElement[jsvData];

		if (linksAndViews) {
			// Get links (propertyChange bindings) on this element and unbind
			collData = linksAndViews.link;
			for (attr in collData) {
				link = collData[attr];
				srcs = link.srcs;
				l = srcs.length;
				while (l--) {
					$(srcs[l]).off(propertyChangeStr, link.hlr);
				}
				srcs = link.arrs;
				l = srcs.length;
				while (l--) {
					$([srcs[l]]).off(arrayChangeStr, link.hlr);
				}
			}

			// Get views for which this element is the parentElement, and remove from parent view
			collData = linksAndViews.view;
			if (l = collData.length) {
				parentView = $.view(elem);
				while (l--) {
					view = collData[l];
					if (view.parent === parentView) {
						parentView.removeViews(view.key);
					}
				}
			}
		}
	}