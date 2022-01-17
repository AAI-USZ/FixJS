function(html) {
			if (!module.FormDialog.checkOpenError(html)) {
				jQuery("body").append(html);
				var form = new _class(jQuery("#" + _ID));
				form.fragment = fragment;
				form.modal = modal;
				form.onSaved = onSaved;
				form.open();
			}
		}