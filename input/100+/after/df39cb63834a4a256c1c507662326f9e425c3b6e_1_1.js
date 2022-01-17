function($handledElement, options) {
		this.parent($handledElement, options);

		// We need to know the static part of the element id
		// (id attribute will change after refreshing,
		// because it uses the uniqId function) for accessing
		// the link action element in the DOM.
		if (options.staticId) {
			this.staticId_ = options.staticId;
		} else {
			// If none, the link action element id is
			// not using the unique function, so we
			// can consider it static.
			this.staticId_ = $handledElement.attr('id');
		}

		// Instantiate the link action request.
		if (!options.actionRequest || !options.actionRequestOptions) {
			throw Error(['The "actionRequest" and "actionRequestOptions"',
				'settings are required in a LinkActionHandler'].join(''));
		}

		// Bind the handler for image preview.
		if ($handledElement.hasClass('image')) {
			this.bind('mouseover', this.imagePreviewHandler_);
		}

		// Configure the callback called when the link
		// action request finishes.
		options.actionRequestOptions.finishCallback =
				this.callbackWrapper(this.enableLink);

		this.linkActionRequest_ =
				/** @type {$.pkp.classes.linkAction.LinkActionRequest} */
				($.pkp.classes.Helper.objectFactory(
						options.actionRequest,
						[$handledElement, options.actionRequestOptions]));

		// Bind the link action request to the handled element.
		this.bindActionRequest();

		// Publish this event so we can handle it and grids still
		// can listen to it to refresh themselves.
		//
		// This needs to happen before the dataChangedHandler_ bound,
		// otherwise when the publish event handler try to bubble up the
		// dataChanged event, this html element could be already removed
		// by the notifyUser event handlers triggered by dataChangedHandler_
		this.publishEvent('dataChanged');

		// Bind the data changed event, so we know when trigger
		// the notify user event.
		this.bind('dataChanged', this.dataChangedHandler_);
		
		// Bind the 'modalCanceled' event, so we can re-enable submit buttons
		this.bind('modalCanceled', this.removeDisabledCssClass_);

		if (options.selfActivate) {
			this.trigger('click');
		}
	}