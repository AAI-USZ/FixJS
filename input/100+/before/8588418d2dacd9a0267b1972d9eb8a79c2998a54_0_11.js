function(index, dataItems, tmpl) {
			// if view is not an Array View, do nothing
			var viewsCount,
				self = this,
				views = self.views;

			if ( self.isArray && dataItems.length && (tmpl = getTemplate(tmpl || self.tmpl))) {
				// Use passed-in template if provided, since self added view may use a different template than the original one used to render the array.
				viewsCount = views.length + dataItems.length;
				renderAndLink(self, index, views, dataItems, tmpl.render(dataItems, self.ctx, undefined, index, self), self.ctx, TRUE);
				while (++index < viewsCount) {
					observable(views[index]).setProperty("index", index);
					// TODO - this is fixing up index, but not key, and not index on child views. Consider changing index to be a getter index(),
					// so we only have to change it on the immediate child view of the Array view, but also so that it notifies all subscriber to #index().
					// Also have a #context() which can be parameterized to give #parents[#parents.length-1].data or #roots[0]
					// to get root data, or other similar context getters. Only create an the index on the child view of Arrays, (whether in JsRender or JsViews)
					// [Otherwise, here, would need to iterate on views[] to set index on children, right down to ArrayViews, which might be too expensive on perf].
				}
			}
			return self;
		}