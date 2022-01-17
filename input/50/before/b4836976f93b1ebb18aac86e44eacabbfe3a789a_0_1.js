function(e){
		e.preventDefault();
		window.location = $(this).attr('href') + '&query=' + $('#filterPatientsValue').val();
	}