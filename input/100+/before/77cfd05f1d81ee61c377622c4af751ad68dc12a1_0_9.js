function compileEmail( args, callback ){
	if ( 0 != args.wait ){
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
		 			callback( err, null );
		 			return;
		 		}
		  	});
		  	console.log('fireeeed away');
		}
		else {
			callback( "user doesnt exist", null );
		}
	}).error(function(error){
		callback(error,null);
	});
}