function getLanguage(id,success_fn,error_fn) {
		$.ajax('do/language',{
			data:	 {id:id},
			dataType: 'json',
			error:	error_fn,
			success:  success_fn
		});
	}