function renderContent(data, context, path, key, parentView, onRender) {
		// Render template against data as a tree of subviews (nested template), or as a string (top-level template).
		// tagName parameter for internal use only. Used for rendering templates registered as tags (which may have associated presenter objects)
		var i, l, dataItem, newView, itemWrap, itemsWrap, itemResult, parentContext, tmpl, onRender, props, swapContent, isLayout,
			self = this,
			result = "";

		if (key === TRUE) {
			swapContent = TRUE;
			key = 0;
		}
		if (self.isTag) {
			// This is a call from renderTag
			tmpl = self.tmpl;
			if (self.props && self.ctx) {
				extend(self.ctx, self.props);
			}
			if (self.ctx && context) {
				context = extend(self.ctx, context);
			}
			context = self.ctx || context;
			parentView = parentView || self.view;
			path = path || self.path;
			key = key || self.key;
			props = self.props;
		} else {
			tmpl = self.jquery && self[0] // This is a call from $(selector).render
			|| self; // This is a call from tmpl.render
		}
		if (tmpl) {
			if (parentView) {
				parentContext = parentView.ctx;
				if (data === parentView) {
					// Inherit the data from the parent view.
					// This may be the contents of an {{if}} block
					// Set isLayout = true so we don't iterate the if block if the data is an array.
					data = parentView.data;
					isLayout = TRUE;
				}
				onRender = onRender || parentView._onRender;
			} else {
				parentContext = jsv.helpers;
			}

			// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
			// Note: If no jQuery, extend does not support chained copies - so limit extend() to two parameters
			// TODO could make this a reusable helper for merging context.
			context = (context && context !== parentContext)
				? extend(extend({}, parentContext), context)
				: parentContext;

			if (!tmpl.fn) {
				tmpl = templates[tmpl] || templates(tmpl);
			}

			if (tmpl) {
				if ($.isArray(data) && !isLayout) {
					// Create a view for the array, whose child views correspond to each data item.
					// (Note: if key and parentView are passed in along with parent view, treat as
					// insert -e.g. from view.addViews - so parentView is already the view item for array)
					newView = swapContent ? parentView : (key !== undefined && parentView) || View(context, path, parentView, data, tmpl, key, onRender, TRUE);
					for (i = 0, l = data.length; i < l; i++) {
						// Create a view for each data item.
						dataItem = data[i];
						itemResult = tmpl.fn(dataItem, View(context, path, newView, dataItem, tmpl, (key || 0) + i, onRender), jsv);
						result += onRender ? onRender(itemResult, tmpl, props) : itemResult;
					}
				} else {
					// Create a view for singleton data object.
					newView = swapContent ? parentView : View(context, path, parentView, data, tmpl, key, onRender);
					newView._onRender = onRender;
					result += tmpl.fn(data, newView, jsv);
				}
				return onRender ? onRender(result, tmpl, props, newView.key, path) : result;
			}
		}
		return ""; // No tmpl. Could throw...
	}