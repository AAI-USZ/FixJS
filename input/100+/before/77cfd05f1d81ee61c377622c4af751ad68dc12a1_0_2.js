function( args, callback ){
	var self = this;
	var addedUserNotifications = new Array();
	var argsWithListeners = new Array();
	NotificationListener.findAllNotificationListeners( args, function( error, listeners ){
		async.forEachSeries( listeners, function( listener, callback ) {
			UserNotificationSettings.findNotificationSettings( listener, function( error, settings ){
				//omg, if no user found then what? settings will be null..
				if(settings){
					switch(args.event){
						case 0: args.wait = settings.notificationOnLike       ; break;
						case 1: args.wait = settings.notificationOnComment    ; break;
						case 2: args.wait = settings.notificationOnStar       ; break;
						case 3: args.wait = settings.notificationOnNewResource; break;
					}
					//by default email notification has not been sent yet
					if ( 0 == args.wait ) {
						args.emailSent = true;
					} else {
						args.emailSent = false;
					}
				}
				delete args.target;
				delete args.event;

				//O M G. pls let me fix more things
				delete args.app;
				delete args.user;
				args.listener = listener;		//not sure, too many bugs

				//where the fuck is the callback?!, i just added it below,
				//this function will never return on a successful result
				async.series([ 
					UserNotification.createUserNotification( args, function( error, newNotification ){
						if ( error ){
							callback( error);
							return;
						}
					}),
					compileEmail( args, function( error, newNotification ){
						if ( error ){
							callback( error, null);
							return;
						}
						else {
							addedUserNotifications.push( newNotification );
						}
					})
				],function(err, results) {
					//?????added this for you cuz u need it to ensure both functions are completed
				});
			});
		} , function( err ){
			if ( err ){
				callback( err, null );
			}
			else {
				callback( null, addedUserNotifications );
			}
		});
	});
}