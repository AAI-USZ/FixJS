function(data, textStatus, jqXHR){
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
		}