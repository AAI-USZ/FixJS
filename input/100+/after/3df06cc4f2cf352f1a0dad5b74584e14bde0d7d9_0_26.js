function( error, likeListener){
		if (error ) {
			console.log("[NotificationAction.createNewResource] error - invalid like listener");
			callback( null, new Array());
			return;
		}
		arg.event = 1;
		notificationArray.push( likeListener );
		self.addNotifier( arg, function( error, commentListener){
			if (error ) {
				console.log("[NotificationAction.createNewResource] error - invalid comment listener");
				callback( null, new Array());
				return;
			}
			arg.event = 2;
			notificationArray.push(commentListener );
			self.addNotifier( arg, function( error, starListener){
				if (error ) {
					console.log("[NotificationAction.createNewResource] error - invalid star listener");
					callback( null, new Array());
					return;
				}
				notificationArray.push( starListener );
				if ( notificationArray.length == 3 ){
					callback( null, notificationArray );
				} else {
					console.log("[NotificationAction.createNewResource] error - " + error);
					callback( null, new Array());
				}
			});
		});
	}