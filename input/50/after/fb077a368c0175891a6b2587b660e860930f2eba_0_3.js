function $viewsTags(name, tagFn) {
		// Register template tags
		// Setter: Use $.view.tags( name, tagFn ) or $.view.tags({ name: tagFn, ... }) to add additional tags to the registered tags collection.
		// Getter: Use var tagFn = $.views.tags( name ) or $.views.tags[name] or $.views.tags.name to return the object for the registered tag.
		// Remove: Use $.view.tags( name, null ) to remove a registered tag from $.view.tags.

		// When registering for {{foo a b c==d e=f}}, tag should be a function with the signature:
		// function(a,b). The 'this' pointer will be a hash with properties c and e.
		return addToStore(this, $viewsTags, name, tagFn);
	}