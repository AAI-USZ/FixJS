function( args, callback ){

	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('app'));
		                            
	if (!containsAllProperties ){
		callback("Invalid args ", null );
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
		arg.event = 1;
		notificationArray.push( likeListener );
		self.addNotifier( arg, function( error, commentListener){
			arg.event = 2;
			notificationArray.push(commentListener );
			self.addNotifier( arg, function( error, starListener){
				notificationArray.push( starListener );
				if ( notificationArray.length == 3 ){
					callback( null, notificationArray );
				} else {
					callback( error, null );
				}
			});
		});
	});
}