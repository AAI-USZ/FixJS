function() {
		// don't call _super, just call init_dialog_success at the end
		this.uiDialog.dialog('option', 'zIndex', 1200); // set z-index here, because it can't set by _super

		// enhance action button
		var actionButton = this.uiDialog.parent().find(':button:contains("Action")');
		actionButton.attr('id', 'action-button');

		actionButton.find('.ui-button-text').text(gettext('Select'));

		actionButton.attr('disabled', 'disabled');
		actionButton.addClass('ui-button-disabled ui-state-disabled');

		this.uiDialog.dialog('option', 'title', gettext('Select a file'));

		this.init_dialog_success();
	}