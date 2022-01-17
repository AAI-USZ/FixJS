function(event) { 
		event.preventDefault(); 
		$(".alert").hide(); 
		main.prepend("<img class='working' src='/public/img/load.gif' />");
		 
		id = $(this).parent().attr("id");
		
		var data = { 
			'id': id
		}; 
		
		$.post( 
			'/twitauth/app.php', 
			data, 
			function( response ) { 
				// todo: check if status exists before going deeper
				$(".working").hide(); 
				//console.dir( response ); 

				var status = response[0].status.text; 
				var status_id = response[0].status.id; 
				var screen_name = response[0].screen_name; 
				app.print_tweet( status, screen_name, status_id ); 
			}, 
			'json'
		);  	
	}