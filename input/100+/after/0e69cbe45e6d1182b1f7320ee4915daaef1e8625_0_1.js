function genericLoadDialog(form_selector, dialog_selector, onSuccessHandler, matchString, redirect_to){
	$.ajax({
		url: $(form_selector).attr('action'),
		type: 'POST',
		data:  $(form_selector).serialize(),
		success: function(data, textStatus, jqXHR){
			if(data.match(matchString)){
				// We got errors in form
				$(dialog_selector).html(data).modal('show');
				options = {trigger: 'manual', placement: 'right'}
				$('.form_field').tooltip(options).tooltip('show');
				return false;
			}
			if(onSuccessHandler && typeof onSuccessHandler == 'function'){
				onSuccessHandler();
			}
			$(dialog_selector).modal('hide');
			window.location.replace(redirect_to);
		},
	})
}