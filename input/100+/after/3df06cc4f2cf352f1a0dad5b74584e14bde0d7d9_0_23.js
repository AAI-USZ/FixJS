function( args, callback){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.removeStarNotifier] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('app'));
		                            
	if (  !containsAllProperties ){
		console.log("[NotificationAction.removeStarNotifier] error - Invalid args");
		callback( null, new Object());
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.target = args.target;
	arg.app = args.app;
	arg.event = 2;
	
	this.removeNotifier( arg, callback);
}