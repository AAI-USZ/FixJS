function(tabsElement, event, ui) {

		var unsavedForm = false;
		this.$currentTab_.find('form').each(function(index) {
			if ($.pkp.controllers.SiteHandler.prototype.isFormUnsaved(
					$(this).attr('id'))) {
				unsavedForm = true;
				return false; // found an unsaved form, no need to continue with each().
			}
		});

		if (unsavedForm) {
			if (!confirm($.pkp.locale.form_dataHasChanged)) {
				return false;
			} else {
				$.pkp.controllers.SiteHandler.prototype
						.unregisterAllUnsavedFormElements();
			}
		}

		if (this.emptyLastTab_) {
			this.$currentTab_.empty();
		}
		return true;
	}