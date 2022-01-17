function genericLoadDialog(form_selector, dialog_selector, onSuccessHandler, matchString){
	$.ajax({
		url: $(form_selector).attr('action'),
		type: 'POST',
		data:  $(form_selector).serialize(),
		success: function(data, textStatus, jqXHR){
			if(data.match(matchString)){
				// We got errors in form
				$(dialog_selector).html(data).modal('show');
				// options = {delay: { show: 500, hide: 100 }}
				// $('.field_error').popover(options).show();
				return false;
			}
			if(onSuccessHandler && typeof onSuccessHandler == 'function'){
				onSuccessHandler();
			}
			$(dialog_selector).modal('hide');
		},
	})
}