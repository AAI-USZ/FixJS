function(jqXHR, textStatus, errorThrown) {
				var alertContent = $("<div title='Game master says'/>").append("<p>" + jqXHR.responseText + "</p>");			
				alertContent.dialog({ modal: true });
			}