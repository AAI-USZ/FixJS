function getCode(id,success_fn,error_fn) {
		$.ajax('do/code',{
			data:	 {id:id},
			dataType: 'json',
			error:	error_fn,
			success:  success_fn
		});
	}