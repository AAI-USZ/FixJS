function( args, callback ){
	var self = this;
	args.event = 0;
	var notificationArray = new Array();
	self.addNotifier( args, function( error, likeListener){
		args.event = 1;
		notificationArray.push( likeListener );
		self.addNotifier( args, function( error, commentListener){
			args.event = 2;
			notificationArray.push(commentListener );
			self.addNotifier( args, function( error, starListener){
				notificationArray.push( starListener );
				callback(null, notificationArray);
			} );
		});
	});
}