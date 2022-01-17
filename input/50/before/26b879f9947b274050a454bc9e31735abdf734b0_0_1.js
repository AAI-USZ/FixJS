function(data) {
				var toHTML = compassAPI.formatDataForHTML(data);		
				$('#debug-compassWatch').html(toHTML);
			}