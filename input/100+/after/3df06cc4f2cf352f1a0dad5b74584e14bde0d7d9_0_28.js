function( args, callback ){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.createNewQuestion] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('user') &&
		                               args.hasOwnProperty('target'));
		                            
	if (  !containsAllProperties ){
		console.log("[NotificationAction.createNewQuestion] error - Invalid args");
		callback( null, new Object());
		return;
	}
	
	var arg = new Object();
	arg.app = args.app;
	arg.user = args.user;
	arg.target = args.target;
	
	this.addCommentNotifier( args, callback );
}