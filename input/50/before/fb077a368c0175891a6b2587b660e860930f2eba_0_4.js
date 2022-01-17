function helpers(name, helperFn) {
		// Register helper functions for use in templates (or in data-link expressions if JsViews is loaded)
		// Setter: Use $.view.helpers( name, helperFn ) or $.view.helpers({ name: helperFn, ... }) to add additional helpers to the registered helpers collection.
		// Getter: Use var helperFn = $.views.helpers( name ) or $.views.helpers[name] or $.views.helpers.name to return the function.
		// Remove: Use $.view.helpers( name, null ) to remove a registered helper function from $.view.helpers.
		// Within a template, access the helper using the syntax: {{... ~myHelper(...) ...}}.
		return addToStore(this, helpers, name, helperFn);
	}