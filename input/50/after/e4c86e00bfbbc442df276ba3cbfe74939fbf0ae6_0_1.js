function() {
			if($('input[name=Address').val() != '' && $('.pointAdded').length == 0) {
				alert('the point has not been added correctly, please try again before saving');
				return false;
			}
		}