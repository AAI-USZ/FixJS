function(data) {
				var toHTML = compassAPI.formatDataForHTML(data);		
				$('#debug-compass').html(toHTML);
			}