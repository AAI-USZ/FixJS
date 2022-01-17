function postComment() {
		
		var comment = {
				'body': textarea[0].value
			};
	
		$.ajax({
			url: path,
			type: 'POST',
			data: JSON.stringify(comment),
			dataType: 'json',
			headers:  {
				 Authorization: 'token '+ window.store.getItem('token'), 
				 Accept: 'application/vnd.github.raw'
				//'Content-Type': 'application/json; charset=UTF-8'
			},
			success: function(data, status, jqXHR){
				
				// We have to render to markdown before inserting
				renderMarkdown(data);
				
				// Reset the textarea value
				textarea[0].value = '';
				
			},
			error: function() {
				err(commentContainer);
			}
		});
		
	}