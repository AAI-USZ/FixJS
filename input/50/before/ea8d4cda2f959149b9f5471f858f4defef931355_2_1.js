function(cancelButton, event) {

		$.pkp.controllers.SiteHandler.prototype.
				unregisterUnsavedFormElement(this.getHtmlElement());
		this.formChangesCurrentlyTracked_ = false;

		// Trigger the "form canceled" event.
		this.trigger('formCanceled');
		return false;
	}