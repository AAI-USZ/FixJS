function($) {


	/**
	 * @constructor
	 *
	 * @extends $.pkp.classes.Handler
	 *
	 * @param {jQuery} $handledElement The clickable element
	 *  the link action will be attached to.
	 * @param {Object} options Configuration of the link action
	 *  handler. The object must contain the following elements:
	 *  - actionRequest: The action to be executed when the link
	 *                   action is being activated.
	 *  - actionRequestOptions: Configuration of the action request.
	 *  - actionResponse: The action's response listener.
	 *  - actionResponseOptions: Options for the response listener.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler =
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

		if (options.selfActivate) {
			this.trigger('click');
		}
	};
	$.pkp.classes.Helper.inherits(
			$.pkp.controllers.linkAction.LinkActionHandler,
			$.pkp.classes.Handler);


	//
	// Private properties
	//
	/**
	 * The link action request object.
	 * @private
	 * @type {$.pkp.classes.linkAction.LinkActionRequest}
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			linkActionRequest_ = null;


	/**
	 * The part of this HTML element id that's static, not
	 * changing after a refresh.
	 * @private
	 * @type {string}
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			staticId_ = null;


	//
	// Getter
	//
	/**
	 * Get the static id part of the HTML element id.
	 * @return {string} Non-unique part of HTML element id.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			getStaticId = function() {
		return this.staticId_;
	};


	/**
	 * Get the link url.
	 * @return {string} Link url.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			getUrl = function() {
		return this.linkActionRequest_.getUrl();
	};


	//
	// Private methods
	//
	/**
	 * Preview an image when hovering over its link in the grid.
	 *
	 * @private
	 *
	 * @param {HTMLElement} sourceElement The element that
	 *  issued the event.
	 * @param {Event} event The triggering event.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			imagePreviewHandler_ = function(sourceElement, event) {

		// Use the jQuery imagepreview plug-in to show the image.
		var $sourceElement = $(sourceElement);
		$sourceElement.imgPreview({
			preloadImages: false,
			imgCSS: {
				width: '300px'
			}
		});
	};


	//
	// Public methods
	//
	/**
	 * Activate the link action request.
	 *
	 * @param {HTMLElement} callingElement The element that triggered
	 *  the link action activation event.
	 * @param {Event} event The event that activated the link action.
	 * @return {boolean} Should return false to stop event propagation.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			activateAction = function(callingElement, event) {

		// Unbind our click handler to avoid double-execution
		// while the link action is executing. We will not disable
		// if this link action have a null action request. In that
		// case, the action request is handled by some parent widget.
		if (this.linkActionRequest_.objectName_ !=
				'$.pkp.classes.linkAction.NullAction') {
			this.disableLink();
		}

		// Call the link request.
		return this.linkActionRequest_.activate.call(this.linkActionRequest_,
				callingElement, event);
	};


	/**
	 * Bind the link action request.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			bindActionRequest = function() {

		// (Re-)bind our click handler so that the action
		// can be executed.
		this.bind('click', this.activateAction);
	};


	/**
	 * Enable link action.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			enableLink = function() {
		var $linkActionElement = $(this.getHtmlElement());

		// only remove the disabled state if it is not a submit button.
		// we let FormHandler remove that after a form is submitted.
		if (!this.getHtmlElement().is(':submit')) {
			$linkActionElement.removeClass('ui-state-disabled');
		}

		var actionRequestUrl = this.getUrl();
		if (this.getHtmlElement().is('a') && actionRequestUrl) {
			$linkActionElement.attr('href', actionRequestUrl);
		}
		this.unbind('click', this.noAction_);
		this.bindActionRequest();
	};


	/**
	 * Disable link action.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			disableLink = function() {
		var $linkActionElement = $(this.getHtmlElement());
		$linkActionElement.addClass('ui-state-disabled');
		if (this.getHtmlElement().is('a')) {
			$linkActionElement.attr('href', '#');
		}
		this.unbind('click', this.activateAction);
		this.bind('click', this.noAction_);
	};


	//
	// Private methods.
	//
	/**
	 * Handle the changed data event.
	 * @private
	 *
	 * @param {jQuery} callingElement The calling html element.
	 * @param {Event} event The event object (dataChanged).
	 * @param {object} eventData Event data.
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			dataChangedHandler_ = function(callingElement, event, eventData) {

		if (this.getHtmlElement().parents('.pkp_controllers_grid').length === 0) {
			// We might want to redirect this data changed event to a grid.
			// Trigger another event so parent widgets can handle this
			// redirection.
			this.trigger('redirectDataChangedToGrid', eventData);
		}
		this.trigger('notifyUser', this.getHtmlElement());
	};


	/**
	 * Click event handler used to avoid any action request.
	 * @return {Boolean} Always returns false.
	 * @private
	 */
	$.pkp.controllers.linkAction.LinkActionHandler.prototype.
			noAction_ = function() {
		return false;
	};


/** @param {jQuery} $ jQuery closure. */
}