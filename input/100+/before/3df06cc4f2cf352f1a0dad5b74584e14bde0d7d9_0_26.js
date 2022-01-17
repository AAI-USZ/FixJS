function( error, likeListener){
		arg.event = 1;
		notificationArray.push( likeListener );
		self.addNotifier( arg, function( error, commentListener){
			arg.event = 2;
			notificationArray.push(commentListener );
			self.addNotifier( arg, function( error, starListener){
				notificationArray.push( starListener );
				if ( notificationArray.length == 3 ){
					callback( null, notificationArray );
				} else {
					callback( error, null );
				}
			});
		});
	}