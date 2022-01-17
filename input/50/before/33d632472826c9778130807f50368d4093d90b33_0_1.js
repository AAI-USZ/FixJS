function(event){
			if ((event.which == 115 && event.ctrlKey)){
				$('#ajax_form').submit();
				return false;
			}
		}