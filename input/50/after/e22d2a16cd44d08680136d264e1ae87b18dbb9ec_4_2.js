function(data, status, jqXHR){
				
				// We have to render to markdown before inserting
				renderMarkdown(data);
				
				// Reset the textarea value
				textarea[0].value = '';
				
			}