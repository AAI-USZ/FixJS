function(index) {

			var handler = $.pkp.classes.Handler.getHandler($('#' + $(this).attr('id')));
			if (handler.formChangesTracked) {
				unsavedForm = true;
				return false; // found an unsaved form, no need to continue with each().
			}
		}