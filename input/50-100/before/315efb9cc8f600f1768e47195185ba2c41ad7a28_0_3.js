function() {
		// don't call _super, just call init_dialog_success at the end

		// enhance action button
		var action_button = this.uiDialog.parent().find(':button:contains("Action")');
		action_button.attr('id', 'action-button');

		action_button.find('.ui-button-text').text(gettext('Select'));

		action_button.attr('disabled', 'disabled');
		action_button.addClass('ui-button-disabled ui-state-disabled');

		this.uiDialog.dialog('option', 'title', gettext('Select page'));

		this.init_dialog_success();
	}