function($form, options) {
		this.parent($form, options);

		// Check whether we really got a form.
		if (!$form.is('form')) {
			throw Error(['A form handler controller can only be bound',
				' to an HTML form element!'].join(''));
		}

		// Transform all form buttons with jQueryUI.
		$('.button', $form).button();

		// Transform all select boxes.
		$('select', $form).not('.noStyling').selectBox();

		// Activate and configure the validation plug-in.
		if (options.submitHandler) {
			this.callerSubmitHandler_ = options.submitHandler;
		}

		// Set the redirect-to URL for the cancel button (if there is one).
		if (options.cancelRedirectUrl) {
			this.cancelRedirectUrl_ = options.cancelRedirectUrl;
		}

		// specific forms may override the form's default behavior
		// to warn about unsaved changes.
		if (typeof options.trackFormChanges !== 'undefined') {
			this.trackFormChanges_ = options.trackFormChanges;
		}

		// disable submission controls on certain forms.
		if (options.disableControlsOnSubmit) {
			this.disableControlsOnSubmit_ = options.disableControlsOnSubmit;
		}

		if (options.enableDisablePairs) {
			this.enableDisablePairs_ = options.enableDisablePairs;
			this.setupEnableDisablePairs();
		}

		var validator = $form.validate({
			onfocusout: false,
			errorClass: 'error',
			highlight: function(element, errorClass) {
				$(element).parent().parent().addClass(errorClass);
			},
			unhighlight: function(element, errorClass) {
				$(element).parent().parent().removeClass(errorClass);
			},
			submitHandler: this.callbackWrapper(this.submitHandler_),
			showErrors: this.callbackWrapper(this.showErrors)
		});

		// Activate the cancel button (if present).
		$('#cancelFormButton', $form).click(this.callbackWrapper(this.cancelForm));

		// Initial form validation.
		if (validator.checkForm()) {
			this.trigger('formValid');
		} else {
			this.trigger('formInvalid');
		}

		this.callbackWrapper(this.initializeTinyMCE_());

		// bind a handler to make sure tinyMCE fields are populated.
		$('#submitFormButton', $form).click(this.callbackWrapper(
				this.pushTinyMCEChanges_));

		// bind a handler to handle change events on input fields.
		$(':input', $form).change(this.callbackWrapper(this.formChange));
	}