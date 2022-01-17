function( args, callback ){
	var self = this;
	args.attribute = 1;
	self.addNotifier( args, function( err, data){
		args.attribute = 2;
		self.addNotifier( args, function( err, data){
			args.attribute = 3;
			self.addNotifier( args, function( err, data){
				callback(null, 1);
			} );
		});
	});
}