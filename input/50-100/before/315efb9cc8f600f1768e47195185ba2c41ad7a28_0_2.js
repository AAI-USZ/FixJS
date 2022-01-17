function() {
		// don't call _super, just call init_dialog_success at the end

		// enhance action button
		var actionButton = this.uiDialog.parent().find(':button:contains("Action")');
		actionButton.attr('id', 'action-button');

		actionButton.find('.ui-button-text').text(gettext('Select'));

		actionButton.attr('disabled', 'disabled');
		actionButton.addClass('ui-button-disabled ui-state-disabled');

		this.uiDialog.dialog('option', 'title', gettext('Select a file'));

		this.init_dialog_success();
	}