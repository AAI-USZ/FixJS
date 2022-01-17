function(data) {
				var toHTML = gyroscopeAPI.formatDataForHTML(data);		
				$('#debug-gyroscope').html(toHTML);
			}