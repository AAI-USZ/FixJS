function(fragment, modal, onRegistered) {
		jQuery("#" + _ID).remove();
		
		var args = fragment != null ? {id: fragment.id()} : {};
		piggydb.util.blockPageDuringAjaxRequest();
		jQuery.get("partial/file-form.htm", args, function(html) {
			if (!module.FormDialog.checkOpenError(html)) {
				jQuery("body").append(html);
				var form = new _class(jQuery("#" + _ID));
				form.fragment = fragment;
				form.modal = modal;
				form.onRegistered = onRegistered;
				form.open();
			}
		});
	}