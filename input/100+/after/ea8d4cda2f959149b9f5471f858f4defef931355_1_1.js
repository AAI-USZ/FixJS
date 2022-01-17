function(tabsElement, event, ui) {

		var unsavedForm = false;
		this.$currentTab_.find('form').each(function(index) {

			var handler = $.pkp.classes.Handler.getHandler($('#' + $(this).attr('id')));
			if (handler.formChangesTracked) {
				unsavedForm = true;
				return false; // found an unsaved form, no need to continue with each().
			}
		});

		if (unsavedForm) {
			if (!confirm($.pkp.locale.form_dataHasChanged)) {
				return false;
			} else {
				this.trigger('unregisterAllForms');
			}
		}

		if (this.emptyLastTab_) {
			this.$currentTab_.empty();
		}
		return true;
	}