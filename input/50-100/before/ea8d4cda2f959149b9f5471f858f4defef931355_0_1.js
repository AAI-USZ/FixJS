function(object, event) {

		// any registered and then unregistered forms will exist
		// as properties in the unsavedFormElements_ object. They
		// will just be undefined.  See if there are any that are
		// not.

		var unsavedElementCount = 0;

		for (var element in this.unsavedFormElements_) {
			if (this.unsavedFormElements_[element] !== undefined) {
				unsavedElementCount++;
			}
		}
		if (unsavedElementCount > 0) {
			return $.pkp.locale.form_dataHasChanged;
		}
	}