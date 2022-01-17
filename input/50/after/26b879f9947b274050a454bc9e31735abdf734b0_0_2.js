function(data) {
				var toHTML = accelerometerAPI.formatDataForHTML(data);		
				$('#debug-accelerometer').html(toHTML);
			}