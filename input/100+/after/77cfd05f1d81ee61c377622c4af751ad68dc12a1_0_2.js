function( args, callback ){

	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app') &&
		                               args.hasOwnProperty('description'));
		                            
	if (!containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.target = args.target;
	arg.app = args.app;
	arg.event = args.event;
	arg.description = args.description;
	arg.user = args.user;
	
	var self = this;
	var addedUserNotifications = new Array();
	var argsWithListeners = new Array();
	NotificationListener.findAllNotificationListeners( arg, function( error, listeners ){
		async.forEachSeries( listeners, function( listener, callback ) {
			UserNotificationSettings.findNotificationSettings( listener, function( error, settings ){
				if ( error ){
					callback("error occured "+error, null);
					return;
				}
				if(settings){
					switch(arg.event){
						case 0: arg.wait = settings.notificationOnLike       ; break;
						case 1: arg.wait = settings.notificationOnComment    ; break;
						case 2: arg.wait = settings.notificationOnStar       ; break;
						case 3: arg.wait = settings.notificationOnNewResource; break;
					}
					//by default email notification has not been sent yet
					if ( 0 == arg.wait ) {
						arg.emailSent = true;
					} else {
						arg.emailSent = false;
					}
				}
				delete arg.target;
				delete arg.event;

				arg.listener = listener.uuid;

				async.series([ 
					UserNotification.createUserNotification( arg, function( error, newNotification ){
						if ( error ){
							callback( error, null);
							
						}else {
							callback( null, newNotification );
						}
					}),
					compileEmail( arg, function( error, newNotification ){
						if ( error ){
							callback( error, null);
							return;
						}
						else {
							addedUserNotifications.push( newNotification );
							callback( null, newNotification);
						}
					})
				],function(err, results) {
					if ( err ){
						callback( err, null );
					} else {
						callback( null, results);
					}
					
				});
			});
		} , function( err, results ){
			if ( err ){
				callback( err, null );
			}
			else {
				callback( null, addedUserNotifications );
			}
		});
	});
}