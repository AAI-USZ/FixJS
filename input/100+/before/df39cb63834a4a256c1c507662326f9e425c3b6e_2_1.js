function($handledElement, options) {
		this.parent($handledElement, options);

		// Check the options.
		if (!this.checkOptions(options)) {
			throw Error('Missing or invalid modal options!');
		}

		// Clone the options object before we manipulate them.
		var internalOptions = $.extend(true, {}, options);

		// Merge user and default options.
		internalOptions = this.mergeOptions(internalOptions);

		// Open the modal.
		$handledElement.dialog(internalOptions);

		// Fix title bar and close button.
		this.fixTitleBar_($handledElement, internalOptions);
		this.fixCloseButton_($handledElement, internalOptions);

		// Bind the close event.
		this.bind('dialogclose', this.dialogClose);

		// Publish some otherwise private events triggered
		// by nested widgets so that they can be handled by
		// the element that opened the modal.
		this.publishEvent('redirectRequested');
		this.publishEvent('dataChanged');
		this.publishEvent('containerReloadRequested');

		// Bind notify user event.
		this.bind('notifyUser', this.redirectNotifyUserEventHandler_);

		// Click outside to close.
		var canClose = options.canClose || '1';
		if (canClose) {
			$handledElement.parent().next('.ui-widget-overlay').
					click(this.callbackWrapper(this.outsideClick));
		}
	}