function( user ){
		if ( user != null ) {
			var i = 0;
			var str = "";
			str+=("You have "+arr.length+ " " + visible_apps[arr[0].app] + " notification(s)\n==================\n");
			for (; i < arr.length; i++){
				str+=( i+") "+arr[i].description +"\n");
			}
			str+=("\n\n Thanks for using our service,\n\t"+visible_apps[arr[0].app] +" team\n\n");
			console.log( str );
		
			if ( !debug ) {
				var message = {
   					text:    str,
   					from:    config.emailsettings.from,
   					to:      user.firstName+ " " +user.lastName+"<"+user.email+">",
   					subject: arr[0].app + " : end of "+arr[0].wait+ " notification(s)"
		 		};
		
		 		server.send(message, function(err, message){
		 			console.log(err || message);
		  		});
		  		i = 0;
		  		for (; i < arr.length; i++){
		  			arr[i].emailSent = true;
		  			arr[i].save().success( function(){
		  				console.log("notification sent");
		  			});
		  		}
		  	}
		  	
		  	
		}
		
	}