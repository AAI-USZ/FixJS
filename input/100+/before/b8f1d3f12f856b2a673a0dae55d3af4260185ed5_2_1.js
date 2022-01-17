function( user ){
		if ( user != null ) {
			var i = 0;
			var str = "";
			var index = 1;
			str+=("You have "+ notifications.length + " " + visible_apps[userObj.app] + " notification(s)\n==================\n");
			for (; i < notifications.length; i++){
				var j = notifications[i].length - 1;
				for(;  j >= 0; j--){
					str+=( index+") "+notifications[i][j].description +"\n");
					index++;
				}
				
			}
			str+=("\n\n Thanks for using our service,\n\t"+visible_apps[userObj.app] +" team\n\n");
			console.log( str );
		
			if ( !debug ) {
				var message = {
   					text:    str,
   					from:    config.emailsettings.from,
   					to:      user.firstName+ " " +user.lastName+"<"+user.email+">",
   					subject: userObj.app + " : end of "+visible_apps[waitTime]+ " notification(s)"
		 		};
		
		 	/*	server.send(message, function(err, message){
		 			console.log(err || message);
		  		});*/
		  		i = 0;
		  		for (; i < notifications.length; i++){
		  			notifications[i].emailSent = true;
		  		}
		  	}
		  	
		  	
		}
		
	}