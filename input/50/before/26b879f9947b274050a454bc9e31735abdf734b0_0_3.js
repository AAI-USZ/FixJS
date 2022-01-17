function(data) {
				var toHTML = gyroscopeAPI.formatDataForHTML(data);		
				$('#debug-gyroscopeWatch').html(toHTML);
			}