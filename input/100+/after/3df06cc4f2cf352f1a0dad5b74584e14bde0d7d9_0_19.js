function( args, callback){

	if ( args === null || args === undefined ){
		console.log("[NotificationAction.addStarNotifier] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (   args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('app'));
		                            
	if ( !containsAllProperties ){
		console.log("[NotificationAction.addStarNotifier] error - Invalid args");
		callback( null, new Object());
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app = args.app;
	arg.target = args.target;
	arg.event = 2;
	this.addNotifier( arg, callback);
}