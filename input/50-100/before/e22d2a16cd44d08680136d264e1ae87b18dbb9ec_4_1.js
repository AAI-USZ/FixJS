function renderMarkdown(comment) {
	
		var input = {
			'text': comment.body,
			'mode': 'gfm'
		}
	
		$.ajax({
			url: 'https://api.github.com/markdown',
			type: 'POST',
			data: JSON.stringify(input),
			success: function(data, status, jqXHR) {
				
				comment.body_html = data;
				
				var arr = []
				
				arr.push(comment);
				
				appendData(arr);
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				//console.log(jqXHR, textStatus, errorThrown);
			}
		});

	}