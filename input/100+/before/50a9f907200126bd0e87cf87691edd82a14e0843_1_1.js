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
		
		 		//server.send(message, function(err, message){
		 		//	console.log(err || message);
		  		//});
		  		var uuids = new Array();
		  		var i = notifications.length - 1;
		  		for (; i >= 0; i--){
		  			console.log(notifications[i][0].listener);
		  			uuids.push(notifications[i][0].listener);
		  		}
		  		console.log( "[UUIDS] = "+ uuids );
		  		UserNotification.findAll({ where : { listener : uuids }}).success( function( usernotifications ){
		  			async.forEachSeries( usernotifications, function( userNotification, callback ){
		  				console.log("attempting to update");
		  				userNotification.updateAttributes({
		  					emailSent : true
		  				}).success(function(updateSettings){
		  					console.log("[SUCCESS]");
		  					callback( null, updateSettings );
		  				}).error(function(error){
		  					console.log("[ERROR] "+error);
		  					callback( error, null );
		  				});
		  			
		  				}, function( errors, results) {
		  					if ( errors ){
		  						console.log("[errors ] "+errors);
		  					}
		  					else {
		  						console.log(" all set ");
		  					}
		  				});
		  		}).error(function (error){
		  			console.log("Error");
		  		});
		  		
		  	}
		}
		
	}