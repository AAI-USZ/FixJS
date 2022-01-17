function converters(name, converterFn) {
		// Register converter functions for use in templates (or in data-link expressions if JsViews is loaded)
		// Setter: Use $.view.converters( name, converterFn ) or $.view.converters({ name: converterFn, ... }) to add additional converters to the registered converters collection.
		// Getter: Use var converterFn = $.views.converters( name ) or $.views.converters[name] or $.views.converters.name to return the converter function.
		// Remove: Use $.view.converters( name, null ) to remove a registered converter from $.view.converters.
		// Within a template, access the converter using the syntax: {{myConverter:...}}.
		return addToStore(this, converters, name, converterFn);
	}