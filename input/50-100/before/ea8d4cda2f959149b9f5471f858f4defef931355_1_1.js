function(index) {
			if ($.pkp.controllers.SiteHandler.prototype.isFormUnsaved(
					$(this).attr('id'))) {
				unsavedForm = true;
				return false; // found an unsaved form, no need to continue with each().
			}
		}