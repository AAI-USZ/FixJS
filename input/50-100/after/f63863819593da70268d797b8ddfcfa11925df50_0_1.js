function(jqXHR, textStatus, errorThrown) {
					alert("Error connecting to backend: " + textStatus + " " + errorThrown);
					return false;
				}