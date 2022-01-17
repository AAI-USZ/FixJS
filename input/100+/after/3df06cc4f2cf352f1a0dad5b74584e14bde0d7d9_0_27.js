function( args, callback ){

	if ( args === null || args === undefined ){
		console.log("[NotificationAction.createNewResource] error - Args is not existent");
		callback( null, new Array());
		return;
	}
	
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('app'));
		                            
	if (!containsAllProperties ){
		console.log("[NotificationAction.createNewResource] error - Invalid args");
		callback( null, new Array());
		return;
	}
	
	var arg    = new Object();
	arg.user   = args.user;
	arg.target = args.target;
	arg.app    = args.app;
	
	var self = this;
	arg.event = 0;
	var notificationArray = new Array();
	self.addNotifier( arg, function( error, likeListener){
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
	});
}