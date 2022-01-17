function($widgetWrapper, options) {
		this.parent($widgetWrapper, options);

		this.options_ = options;
		this.unsavedFormElements_ = {};

		$('.go').button();

		// Transform all select boxes.
		$('select', $widgetWrapper).not('.noStyling').selectBox();

		this.bind('redirectRequested', this.redirectToUrl);
		this.bind('notifyUser', this.fetchNotificationHandler_);
		this.bind('updateHeader', this.updateHeaderHandler_);

		// Listen for grid initialized events so the inline help can be shown or hidden.
		this.bind('gridInitialized', this.updateHelpDisplayHandler_);

		// Listen for help toggle events.
		this.bind('toggleInlineHelp', this.toggleInlineHelpHandler_);

		// Bind the pageUnloadHandler_ method to the DOM so it is
		// called.
		$(window).bind('beforeunload',
				this.callbackWrapper(this.pageUnloadHandler_));

		// Avoid IE8 caching ajax results. If it does, widgets like
		// grids will not refresh correctly.
		$.ajaxSetup({cache: false});

		this.setMainMaxWidth_();

		// Check if we have notifications to show.
		if (options.hasSystemNotifications) {
			this.trigger('notifyUser');
		}
	}