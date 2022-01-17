function( userFound ){
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

			console.log("Trying to send email..");
		 	server.send(message, function(err, message){
		 		if ( err ){
					 console.log("Can't send email: " + JSON.stringify(err));
		 			callback( err, null );
		 		} else {
					console.log("Email sent, no errors")
		 			callback( null, message );
		 		}
		 		
		  	});
		}
		else {
			callback( "user doesnt exist", null );
		}
	}