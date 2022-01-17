function( args, callback){
	
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.addLikeUserNotification] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('target') &&
	                              args.hasOwnProperty('app') &&
		                           args.hasOwnProperty('description'));
	if ( !containsAllProperties ){
		console.log("[NotificationAction.addLikeUserNotification] error - Invalid args");
		callback( null, new Object());
		return;
	}
	var arg = new Object();
	arg.target = args.target;
	arg.app = args.app;
	arg.description = args.description;
	arg.event = 0;
	
	this.addUserNotification(arg,callback);
}