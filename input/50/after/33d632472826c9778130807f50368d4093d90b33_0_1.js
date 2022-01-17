function(event){
			if ((String.fromCharCode(event.which).toLowerCase() == 's' && event.ctrlKey)){
				$('#ajax_form').submit();
				return false;
			}
		}