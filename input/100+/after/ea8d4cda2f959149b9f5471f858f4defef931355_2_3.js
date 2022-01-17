function(validator, formElement) {

		// Notify any nested formWidgets of the submit action.
		var formSubmitEvent = new $.Event('formSubmitRequested');
		$(formElement).find('.formWidget').trigger(formSubmitEvent);

		// If the default behavior was prevented for any reason, stop.
		if (formSubmitEvent.isDefaultPrevented()) {
			return false;
		}

		$(formElement).find('.pkp_helpers_progressIndicator').show();

		this.trigger('unregisterChangedForm');

		if (this.callerSubmitHandler_ !== null) {

			this.formChangesTracked = false;
			// A form submission handler (e.g. Ajax) was provided. Use it.
			return this.callbackWrapper(this.callerSubmitHandler_).
					call(validator, formElement);
		} else {
			// No form submission handler was provided. Use the usual method.

			// FIXME: Is there a better way? This is used to invoke
			// the default form submission code. (Necessary to
			// avoid an infinite loop.)
			validator.settings.submitHandler = null;

			this.disableFormControls();

			this.getHtmlElement().submit();
			this.formChangesTracked = false;
		}
	}