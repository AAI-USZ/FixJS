function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('app'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.target = args.target;
	arg.app = args.app;
	arg.event = 0;
	
	this.removeNotifier( arg, callback);
}