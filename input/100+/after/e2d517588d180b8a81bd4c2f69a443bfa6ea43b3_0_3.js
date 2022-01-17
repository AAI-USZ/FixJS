function View(context, path, parentView, data, template, key, onRender, isArray) {
		// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
		var views,
			self = {
				tmpl: template,
				path: path,
				parent: parentView,
				data: data,
				ctx: context,
				// If the data is an array, this is an 'Array View' with a views array for each child 'Instance View'
				// If the data is not an array, this is an 'Instance View' with a views 'map' object for any child nested views
				views: isArray ? [] : {},
				// _useKey is non zero if is not an 'Array View' (owning a data array). Uuse this as next key for adding to child views map
				_useKey: isArray ? 0 : 1,
				_hlp: getHelper,
				_onRender: onRender
			};

		if (parentView) {
			views = parentView.views;
			if (parentView._useKey) {
				// Parent is an 'Instance View'. Add this view to its views object
				// self.key = is the key in the parent view map
				views[self.key = "_" + parentView._useKey++] = self;
				// self.index = is index of the parent
				self.index = parentView.index;
			} else {
				// Parent is an 'Array View'. Add this view to its views array
				views.splice(
				// self.key = self.index - the index in the parent view array
				self.key = self.index = key !== undefined
					? key
					: views.length,
				0, self);
			}
		}
		return self;
	}