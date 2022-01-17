function getComments(id,success_fn,error_fn) {
		$.ajax('do/comments',{
			data:	 {code_id:id},
			dataType: 'json',
			error:	error_fn,
			success:  success_fn
		});
	}