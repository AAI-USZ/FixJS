function(){
		$('.modal-confirm').modal('hide');
		$.ajax({
			url : '/delete',
			type : "POST",
			success: function(data){
				setTimeout(onDeleteSuccess, 500);
			},
			error: function(jqXHR){
				console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}