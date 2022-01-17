function(callingContext, event) {

		// Close the modal dialog.
		var $modalElement = this.getHtmlElement();
		// get the form from this modalElement so we can unregister it
		var $form = $modalElement.find('form').first();

		// modalClose is called on both 'cancel' and 'close' events.  With
		// callbacks both callingContext and event are undefined. So,
		// unregister this form with SiteHandler.

		if ($form !== undefined) {
			$.pkp.controllers.SiteHandler.prototype.unregisterUnsavedFormElement($form);
		}
		$modalElement.dialog('close');
		return false;
	}