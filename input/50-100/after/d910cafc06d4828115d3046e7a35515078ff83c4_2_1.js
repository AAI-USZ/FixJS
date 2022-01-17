function(catName)
		{
			$.ajax({
				url: '/offerings',
				type : "POST",
				data : { inv : category },
				success: function(data){
					editor.modal('hide');
				},
				error: function(jqXHR){
					editor.modal('hide');
					console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
				}
			});
		}