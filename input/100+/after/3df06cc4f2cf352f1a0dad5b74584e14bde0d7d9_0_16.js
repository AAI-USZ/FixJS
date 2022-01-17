function compileEmail( args, callback ){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.compileEmail] error - Args is not existent");
		callback( null, new Object() );
		return;
	}
	var containsAllProperties = ( args.hasOwnProperty('user')        &&
	                              args.hasOwnProperty('description') &&
		                               args.hasOwnProperty('wait'));
		                            
	if ( !containsAllProperties ){
		console.log("[NotificationAction.compileEmail] error - Invalid args");
		callback( null , new Object() );
		return;
	}
	
	if ( 0 != args.wait ){
	    // it isnt an error if we get out early
		callback(null, new Object());
		return;
	}
	
	var msg = args;
	User.find({ where: { uuid: msg.user}}).success( function( userFound ){
		if ( null != userFound ) {
			var str = "";
			var title = "";
			switch ( msg.app ){
				case 0 : title = "RQRA"  ; break;
				case 1 : title = "Accent"; break;
				case 2 : title = "Engage"; break;
			}
			str+=("You have 1 " + title + " notification!\n==================\n");
				str+=( 1+") "+ msg.description +"\n");
			str+=("\n\n Thanks for using our service,\n\t"+title+" Mobile team\n\n");

			var message = {
   				text:    str,
   				from:    config.emailsettings.from,
   				to:      userFound.firstName+ " " +userFound.lastName+"<"+userFound.email+">",
   				subject: title +" notification"
		 	};

		 	server.send(message, function(err, message){
		 		if ( err ){
		 			console.log("[NotificationAction.compileEmail] error - "+err);
		 			callback( null, new Object());
		 		} else {
		 			callback( null, message );
		 		}
		  	});
		}
		else {
			console.log("[NotificationAction.compileEmail] error - user doesnt exist");
			callback( null, new Object() );
		}
	}).error(function(error){
		console.log("[NotificationAction.compileEmail] error - "+error);
		callback( null, new Object());
	});
}