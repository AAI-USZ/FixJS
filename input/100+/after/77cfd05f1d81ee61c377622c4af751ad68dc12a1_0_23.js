function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('target') &&
	                              args.hasOwnProperty('app') &&
		                               args.hasOwnProperty('user') &&
		                           args.hasOwnProperty('description'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.target = args.target;
	arg.app = args.app;
	arg.user = args.user;
	arg.description = args.description;
	arg.event = 3;
	
	this.addUserNotification(arg,callback);
}