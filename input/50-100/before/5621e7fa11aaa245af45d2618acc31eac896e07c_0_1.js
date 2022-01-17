function() {

			

			$('#status').html("<img src='"+pluginurl+"img/290.gif'/><p>Adding...</p>")

			

			jQuery.post(ajaxurl,{action:'insert_posts',publish:'add'}, function(response) {

				

				if (response.charAt(response.length-1) == "0") {

					response = response.substring(0,response.length-1);

				}



				response = jQuery.parseJSON(response);



				$('#status').html("Added " + response.added + " ads.");



			});

		}