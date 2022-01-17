function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('user') &&
		                               args.hasOwnProperty('target'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.app = args.app;
	arg.user = args.user;
	arg.target = args.target;
	
	this.addCommentNotifier( args, callback );
}