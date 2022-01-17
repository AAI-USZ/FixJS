f		// Render template against data as a tree of subviews (nested template), or as a string (top-level template).
		var i, l, dataItem, newView, itemResult, parentContext, tmpl, props, swapContent, mergedCtx,
			self = this,
			result = "";

		if (key === TRUE) {
			swapContent = TRUE;
			key = 0;
		}
		if (self.isTag) {
			// This is a call from renderTag
			tmpl = self.tmpl;
			if (context || self.ctx) {// || hasProp) {
				// We need to create an augmented context for the view(s) we are about to render
				mergedCtx = {};
				if (self.ctx) {
					// self.ctx is an object with the contextual template parameters on the tag, such as ~foo: {{tag ~foo=expression...}}
					$extend(mergedCtx, self.ctx);
				}
				if (context) {
					// This is a context object passed programmatically from the tag function
					$extend(mergedCtx, context);
				}
			}
			context = mergedCtx;
			props = self.props;
			if ( props && props.link === FALSE ) {
				// link=false setting on block tag
				// We will override inherited value of link by the explicit setting link=false taken from props
				// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
				context =  context || {};
				context.link = FALSE;
			}
			parentView = parentView || self.view;
			path = path || self.path;
			key = key || self.key;
		} else {
			tmpl = self.jquery && (self[0] || error('Unknown template: "' + self.selector + '"')) // This is a call from $(selector).render
				|| self;
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
				parentContext = $viewsHelpers;
			}

			// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
			// Note: If no jQuery, $extend does not support chained copies - so limit $extend() to two parameters
			// TODO could make this a reusable helper for merging context.
			context = (context && context !== parentContext)
				? $extend($extend({}, parentContext), context)
				: parentContext;

			if (!tmpl.fn) {
				tmpl = $templates[tmpl] || $templates(tmpl);
			}

			if (tmpl) {
				onRender = context.link !== FALSE && onRender; // If link===false, do not call onRender, so no data-linking annotations
				if ($.isArray(data) && !isLayout) {
					// Create a view for the array, whose child views correspond to each data item.
					// (Note: if key and parentView are passed in along with parent view, treat as
					// insert -e.g. from view.addViews - so parentView is already the view item for array)
					newView = swapContent ? parentView : (key !== undefined && parentView) || View(context, path, parentView, data, tmpl, key, onRender, TRUE);
					for (i = 0, l = data.length; i < l; i++) {
						// Create a view for each data item.
						dataItem = data[i];
						itemResult = tmpl.fn(dataItem, View(context, path, newView, dataItem, tmpl, (key || 0) + i, onRender), $views);
						result += onRender ? onRender(itemResult, tmpl, props) : itemResult;
					}
				} else {
					// Create a view for singleton data object.
					newView = swapContent ? parentView : View(context, path, parentView, data, tmpl, key, onRender);
					newView._onRender = onRender;
					result += tmpl.fn(data, newView, $views);
				}
				return onRender ? onRender(result, tmpl, props, newView.key, path) : result;
			}
		}
		error("No template found");
		return "";
	}
