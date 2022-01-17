function $templates(name, tmpl) {
		// Register templates
		// Setter: Use $.templates( name, tmpl ) or $.templates({ name: tmpl, ... }) to add additional templates to the registered templates collection.
		// Getter: Use var tmpl = $.templates( name ) or $.templates[name] or $.templates.name to return the object for the registered template.
		// Remove: Use $.templates( name, null ) to remove a registered template from $.templates.
		return addToStore(this, $templates, name, tmpl, compile);
	}