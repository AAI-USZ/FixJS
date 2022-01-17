function(callingContext, event) {

		if (event && event.currentTarget.id == 'cancelFormButton') {
			this.trigger('modalCanceled');
		}
		// Close the modal dialog.
		var $modalElement = this.getHtmlElement();
		// get the form from this modalElement so we can unregister it
		var $form = $modalElement.find('form').first();

		// modalClose is called on both 'cancel' and 'close' events.  With
		// callbacks both callingContext and event are undefined. So,
		// unregister this form with SiteHandler.

		if ($form !== undefined) {
			var handler = $.pkp.classes.Handler.getHandler($('#' + $form.attr('id')));
			if (handler.formChangesTracked) {
				if (!confirm($.pkp.locale.form_dataHasChanged)) {
					return false;
				} else {
					this.trigger('unregisterAllForms');
				}
			}
		}

		$modalElement.dialog('close');
		return false;
	}