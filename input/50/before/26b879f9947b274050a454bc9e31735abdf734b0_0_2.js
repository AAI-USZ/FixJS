function(data) {
				var toHTML = accelerometerAPI.formatDataForHTML(data);		
				$('#debug-accelerometerWatch').html(toHTML);
			}