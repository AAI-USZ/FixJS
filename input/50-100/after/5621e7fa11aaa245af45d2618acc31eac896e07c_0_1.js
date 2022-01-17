function(response) {
				
				if (response.charAt(response.length-1) == "0") {
					response = response.substring(0,response.length-1);
				}

				response = jQuery.parseJSON(response);

				$('#status').html("Added " + response.added + " ads.");

			}